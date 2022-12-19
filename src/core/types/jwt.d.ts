namespace JWTStrategy {
  export type JWTPayload = {
    username: string;
    sub: string;
  };

  export type JWTUser = {
    username: string;
    id: string;
  };
}
