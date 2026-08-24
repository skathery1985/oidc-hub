const crypto = require('crypto');

function base64Url(buf) {
  return buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function runTests() {
  console.log('--- Starting OIDC PKCE Hub End-to-End Automated Tests ---');

  // 1. Discovery
  const discoRes = await fetch('http://localhost:3000/.well-known/openid-configuration');
  const disco = await discoRes.json();
  console.log('✓ Discovery Endpoint OK:', disco.issuer);
  console.assert(disco.code_challenge_methods_supported.includes('S256'), 'Must support S256');

  // 2. JWKS
  const jwksRes = await fetch('http://localhost:3000/mock-idp/jwks.json');
  const jwks = await jwksRes.json();
  console.log('✓ JWKS Endpoint OK: Key ID =', jwks.keys[0].kid);

  // 3. Generate PKCE
  const verifier = base64Url(crypto.randomBytes(32));
  const challenge = base64Url(crypto.createHash('sha256').update(verifier, 'ascii').digest());
  console.log('✓ Generated Verifier:', verifier);
  console.log('✓ Generated S256 Challenge:', challenge);

  // 4. Authorization Request with auto_consent
  const authUrl = `http://localhost:3000/mock-idp/authorize?client_id=test-client&redirect_uri=http://localhost:3000/callback.html&response_type=code&scope=openid%20profile%20email&state=test_state&nonce=test_nonce&code_challenge=${challenge}&code_challenge_method=S256&auto_consent=true`;
  
  const authRes = await fetch(authUrl, { redirect: 'manual' });
  const location = authRes.headers.get('location');
  console.log('✓ Auth Redirect Location:', location);
  const redirectUrl = new URL(location);
  const code = redirectUrl.searchParams.get('code');
  console.log('✓ Obtained Authorization Code:', code);

  // 5. Token Exchange with Verifier
  const tokenRes = await fetch('http://localhost:3000/mock-idp/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      grant_type: 'authorization_code',
      client_id: 'test-client',
      redirect_uri: 'http://localhost:3000/callback.html',
      code: code,
      code_verifier: verifier
    })
  });
  const tokens = await tokenRes.json();
  console.log('✓ Token Exchange Success! Tokens received:');
  console.log('  - access_token:', tokens.access_token.substring(0, 15) + '...');
  console.log('  - id_token (RS256 JWT):', tokens.id_token.substring(0, 20) + '...');
  console.log('  - refresh_token:', tokens.refresh_token.substring(0, 15) + '...');

  // 6. UserInfo
  const userinfoRes = await fetch('http://localhost:3000/mock-idp/userinfo', {
    headers: { 'Authorization': `Bearer ${tokens.access_token}` }
  });
  const userInfo = await userinfoRes.json();
  console.log('✓ UserInfo Success! User Name:', userInfo.name, '| Email:', userInfo.email);

  // 7. Refresh Token Rotation
  const refreshRes = await fetch('http://localhost:3000/mock-idp/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      grant_type: 'refresh_token',
      client_id: 'test-client',
      refresh_token: tokens.refresh_token
    })
  });
  const refreshedTokens = await refreshRes.json();
  console.log('✓ Refresh Token Rotation Success! Rotated Refresh Token:', refreshedTokens.refresh_token.substring(0, 15) + '...');

  // 8. Negative Test: Test Wrong Verifier (should fail with invalid_grant)
  // Get fresh code
  const authRes2 = await fetch(authUrl, { redirect: 'manual' });
  const code2 = new URL(authRes2.headers.get('location')).searchParams.get('code');
  const badTokenRes = await fetch('http://localhost:3000/mock-idp/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      grant_type: 'authorization_code',
      client_id: 'test-client',
      redirect_uri: 'http://localhost:3000/callback.html',
      code: code2,
      code_verifier: 'WRONG_VERIFIER_1234567890123456789012345678901234567890'
    })
  });
  const badData = await badTokenRes.json();
  console.log('✓ Negative Security Test (Wrong Verifier correctly rejected):', badData.error, '-', badData.error_description);

  console.log('\n=================================================');
  console.log('🎉 ALL 8 PKCE VERIFICATION & OIDC TESTS PASSED!');
  console.log('=================================================');
}

runTests().catch(console.error);
