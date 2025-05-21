import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Textarea } from "./components/ui/textarea";
import { toast, Toaster } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

type TFeedbackSchema = z.infer<typeof feedbackSchema>;

const feedbackSchema = z.object({
  fullName: z
    .string()
    .min(4, "Your full name must contain at least 4 letters."),
  email: z.string().email("Insert a valid email address."),
  feedback: z.string().refine((val) => val.trim().split(/\s+/).length >= 4, {
    message: "Please write at least 4 words.",
  }),
});

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TFeedbackSchema>({ resolver: zodResolver(feedbackSchema) });

  const onSubmit = async (data: TFeedbackSchema) => {
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.dismiss();
    toast("Message sent!", {
      description: "Your message was successfully sent.",
      classNames: {
        toast: "!bg-success !text-white",
        description: "!text-white",
      },
    });
  };

  const onInvalidSubmit = () => {
    toast.dismiss();
    toast("Something went wrong!", {
      description: "Your message couldn’t be sent.",
      classNames: {
        toast: "!bg-destructive !text-white",
        description: "!text-white",
      },
    });
  };

  return (
    <>
      <div className="min-h-screen flex justify-center items-center bg-white font-poppins">
        <form
          className="w-[369px] border border-grey-1 p-6 rounded-lg shadow-sm"
          onSubmit={handleSubmit(onSubmit, onInvalidSubmit)}
        >
          <h1 className="text-2xl font-semibold text-text-primary">
            Share your feedback
          </h1>
          <p className="text-text-secondary text-sm mt-1.5">
            We would love to hear your thoughts.
          </p>

          <div className="my-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                placeholder="Insert your full name"
                {...register("fullName")}
                className={errors.fullName && "!border-destructive"}
                disabled={isSubmitting}
              />
              <span className="text-destructive text-sm">
                {errors.fullName?.message}
              </span>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="johndoe@sumitomo.com"
                className={errors.email && "!border-destructive"}
                {...register("email")}
                disabled={isSubmitting}
              />
              <span className="text-destructive text-sm">
                {errors.email?.message}
              </span>
            </div>
            <div className="space-y-2">
              <Label htmlFor="feedback">Feedback</Label>
              <Textarea
                id="feedback"
                placeholder="Insert your feedback"
                {...register("feedback")}
                className={errors.feedback && "!border-destructive"}
                disabled={isSubmitting}
              />
              <span className="text-destructive text-sm">
                {errors.feedback?.message}
              </span>
            </div>
          </div>
          <Button className="w-full" disabled={isSubmitting}>
            Share feedback
          </Button>
        </form>
      </div>
      <Toaster />
    </>
  );
}

export default App;
