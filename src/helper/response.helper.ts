// response.helper.ts
import { plainToInstance } from 'class-transformer';
import { ResponseDto } from 'src/users/dto/responst.dto';

export function toResponse<T>(
  data: T,
  message = 'Berhasil',
  success = true,
  notify?: boolean,
): ResponseDto<T> {
  return plainToInstance<ResponseDto<T>, Partial<ResponseDto<T>>>(ResponseDto, {
    success,
    message,
    data,
    notify,
  });
}
