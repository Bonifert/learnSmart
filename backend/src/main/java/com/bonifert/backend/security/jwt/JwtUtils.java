package com.bonifert.backend.security.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtils {
  @Value("${app.jwtSecret}")
  private String jwtSecret;
  @Value("${app.jwtExpirationMs}")
  private int jwtExpirationMs;

  public String generateJwtToken(Authentication authentication) {
    Date issuedAt = new Date();
    Date expiration = new Date(issuedAt.getTime() + jwtExpirationMs);

    return Jwts.builder()
               .setSubject(authentication.getName())
               .setIssuedAt(issuedAt)
               .setExpiration(expiration)
               .signWith(key(), SignatureAlgorithm.HS256)
               .compact();
  }

  private Key key() {
    return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
  }

  // should extend with MalformedJwtException, ExpiredJwtException etc. and logging
  public Jws<Claims> validateJwtToken(String authToken) {
    try {
      return Jwts.parserBuilder().setSigningKey(key()).build().parseClaimsJws(authToken);
    }
    catch (Exception e) {
      System.out.println(e.getMessage());
    }
    return null;
  }

  public String getUsername(Jws<Claims> claimsJws) {
    return claimsJws.getBody().getSubject();
  }

}
