import React, { type FormEvent, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useController } from "react-hook-form";
import * as z from "zod";

import messageCircle from "../icons/message-circle.svg";

const messageRegex = /^[a-zA-Z0-9\s.,!?'"();/-]+$/;

const contactFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Your name is too short." })
    .max(50, { message: "Your name is too long." })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Your name can only contain letters and spaces.",
    }),
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .max(254, {
      message: "Email exceeds the maximum length of 254 characters.",
    })
    .email({ message: "Invalid email address." }),
  message: z
    .string()
    .min(4, { message: "Message is too short." })
    .max(2500, { message: "Message is too long." })
    .regex(messageRegex, {
      message: "Message contains invalid characters.",
    }),
  honeypot: z.string().max(0, { message: "Invalid form submission." }),
  submit: z.string().max(0, { message: "Invalid form submission." }),
});
// make react component
const ContactForm = () => {
  const [responseMessage, setResponseMessage] = useState("");
  const formRef = React.createRef<HTMLFormElement>();

  const form = useForm({
    resolver: zodResolver(contactFormSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      message: "",
      honeypot: "",
      submit: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof contactFormSchema>) => {
    if (responseMessage === "Your message was successfully sent!") {
      return;
    }

    try {
      if (!formRef.current) return;

      const formData = new FormData(formRef.current);

      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      setResponseMessage("Your message was successfully sent!");

      form.reset();
    } catch (error) {
      console.error(error);
      setResponseMessage("An error occurred. The message was not sent.");
      form.reset();
    }
  };

  return (
    <Dialog>
      <DialogTrigger
        title="Message me"
        className={buttonVariants({
          size: "icon",
          variant: "link",
          class:
            "text-stone-800 hover:text-stone-600 dark:text-white dark:hover:text-stone-300",
        })}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24">
          <path d="M3 21l1.9-5.7a8.5 8.5 0 113.8 3.8z"></path>
        </svg>
      </DialogTrigger>
      <DialogContent className="overflow-y-scroll max-h-screen gap-2">
        <DialogHeader>
          <DialogTitle className="text-left text-stone-800 text-xl md:text-2xl lg:text-3xl">
            Let&apos;s connect!
          </DialogTitle>
          <DialogDescription className="text-left text-stone-800 text-lg">
            I&apos;m always looking for new opportunities and challenges. Feel
            free to reach out to me with any questions or comments.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            ref={formRef}
            noValidate
            method="POST"
            name="contact_form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto flex max-h-screen w-full max-w-2xl flex-col items-center justify-start mb-4">
            <div className="mx-auto flex w-full max-w-2xl flex-col items-center justify-center text-left text-sm text-stone-800">
              <ScrollArea className="h-full w-full">
                <div className="mx-auto flex w-full flex-col items-center justify-center md:flex-row md:flex-wrap">
                  <div className="flex w-full flex-col md:flex-row md:gap-4">
                    <div className="flex w-full flex-col p-2">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="w-full font-bold text-lg">
                              Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                required
                                className="w-full rounded-sm focus:border-black focus:ring-black text-lg"
                                placeholder="Justin Bachtell"
                                {...field}
                              />
                            </FormControl>
                            {/* <FormDescription>
                            Enter your first name.
                          </FormDescription> */}
                            <FormMessage className="text-base" />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex w-full flex-col p-2">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="w-full font-bold text-lg">
                              Email
                            </FormLabel>
                            <FormControl>
                              <Input
                                required
                                className="w-full rounded-sm focus:border-black focus:ring-black text-lg"
                                placeholder="example@email.com"
                                {...field}
                              />
                            </FormControl>
                            {/* <FormDescription>Enter your email.</FormDescription> */}
                            <FormMessage className="text-base" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className="mx-auto flex w-full max-w-2xl flex-col items-center justify-center">
                  <div className="flex w-full flex-col p-2">
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="w-full font-bold text-lg">
                            Your message
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              required
                              rows={6}
                              placeholder="Let me know what you're thinking..."
                              className="resize-none w-full focus:border-black focus:ring-black text-lg"
                              {...field}
                            />
                          </FormControl>
                          {/* <FormDescription>
                        Let me know what you're thinking.
                      </FormDescription> */}
                          <FormMessage className="text-base" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <div className="mx-auto flex w-full max-w-2xl flex-col items-center justify-center p-2">
                    <FormField
                      control={form.control}
                      name="honeypot"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="hidden"
                              className="w-full rounded-sm focus:border-black focus:ring-black"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      id="contact_submit_button"
                      className={cn(
                        "w-full py-2 px-4 rounded-sm text-white font-bold bg-stone-800 hover:bg-stone-300 hover:text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-800 focus:ring-opacity-50 cursor-pointer duration-200 text-lg",
                      )}
                      disabled={!form.formState.isValid}>
                      Send message
                    </Button>
                    {responseMessage && (
                      <p className="text-base text-green-800 mt-2 bold">
                        {responseMessage}
                      </p>
                    )}
                  </div>
                </DialogFooter>
              </ScrollArea>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactForm;
