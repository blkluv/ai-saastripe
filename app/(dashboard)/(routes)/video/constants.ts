import * as z from "zod";

//min 메서드는 minlength의 약자, 첫 번째 인자로 minlength 속성값을, 두번 째 인자로 error메세지를 전달 받는다.
export const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Video Prompt is required",
  }),
});
