import { useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Textarea } from "./components/ui/textarea";
import { toast, Toaster } from "sonner";

function App() {
  const [error, setError] = useState(true);

  return (
    <>
      <div className="min-h-screen flex justify-center items-center bg-white font-poppins">
        <form className="w-[369px] border border-grey-1 p-6 rounded-lg shadow-sm" onSubmit={e => e.preventDefault()}>
          <h1 className="text-2xl font-semibold text-text-primary">
            Share your feedback
          </h1>
          <p className="text-text-secondary text-sm mt-1.5">
            We would love to hear your thoughts.
          </p>

          <div className="my-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" placeholder="Insert your full name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="johndoe@sumitomo.com"
                type="email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="feedback">Feedback</Label>
              <Textarea id="feedback" placeholder="Insert your feedback" />
            </div>
          </div>
          <Button
            className="w-full"
            onClick={() =>
              toast('Message sent!', {
                description: 'Your message was successfully sent.'
              })
            }
          >
            Share feedback
          </Button>
        </form>
      </div>
      <Toaster
        toastOptions={{
          classNames: {
            toast: `!${error ? "bg-destructive" : "bg-success"} !text-white`,
            description: "!text-white",
          },
        }}
      />
    </>
  );
}

export default App;
