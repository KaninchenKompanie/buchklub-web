import { TokenData, TokenDataDto } from "../types";

export function mapTokenDataDtoToTokenData(
  tokenDataDto: TokenDataDto
): TokenData {
  return {
    accessToken: tokenDataDto.access_token,
    refreshToken: tokenDataDto.refresh_token,
  };
}
