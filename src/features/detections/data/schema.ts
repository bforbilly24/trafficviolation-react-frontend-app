import { z } from 'zod'

const formSchema = z.object({
  file: z
    .array(z.instanceof(File))
    .length(1, { message: 'Harap unggah tepat satu file video.' })
    .refine(
      (files) =>
        files.every((file) =>
          ['video/mp4', 'video/quicktime', 'video/x-msvideo'].includes(
            file.type
          )
        ),
      'Hanya format file MP4, MOV, atau AVI yang didukung.'
    ),
})

export default formSchema
