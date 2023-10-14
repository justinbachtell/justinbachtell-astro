import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const ProjectModal = ({ params }) => {
  const convertSvgToComponent = (svgString: string) => {
    const Svg = () => (
      <div
        className="flex justify-center items-center h-10 w-10 [&>svg]:w-10 [&>svg]:h-10"
        dangerouslySetInnerHTML={{ __html: svgString }}
      />
    );
    return <Svg />;
  };

  return (
    <Dialog>
      <DialogTrigger className="absolute h-full w-full hover:shadow-md hover:bg-black opacity-10 rounded-md duration-200 transition-all"></DialogTrigger>
      <DialogContent className="overflow-y-scroll max-h-screen">
        <DialogHeader className="flex mx-auto justify-center">
          <DialogTitle className="text-stone-800 text-xl md:text-2xl lg:text-3xl mb-0 justify-center mx-auto">
            {params.title}
          </DialogTitle>
          <Separator className="my-2 w-2/3 mx-auto" />
          <DialogDescription className="text-stone-800 text-lg">
            {params.description}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col justify-between items-center gap-4">
          <div className="flex flex-row justify-center items-center gap-4">
            {params?.links?.map(
              (
                item: { title?: string; url?: string; icon?: string },
                index: number,
              ) => (
                <a
                  key={index}
                  title={item.title}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer noopener"
                  className={buttonVariants({
                    size: "default",
                    variant: "default",
                    class:
                      "dark:text-white dark:underline dark:visited:text-white dark:visited:decoration-white even:bg-transparent even:text-stone-800 even:hover:bg-stone-200 even:hover:text-stone-800",
                  })}>
                  View {item.title}
                </a>
              ),
            )}
          </div>
          <div className="flex flex-col justify-center items-center gap-2 w-full">
            <h3 className="flex font-bold text-lg lg:text-2xl mb-0">
              Built with
            </h3>
            <ul className="flex flex-row flex-wrap justify-center items-center gap-1">
              {params.technologyStack.map(
                (
                  item: { url?: string; icon?: string; title?: string },
                  index: number,
                ) => (
                  <li
                    key={index}
                    className="flex justify-center text-stone-800 text-sm mr-2 hover:shadow-md hover:border h-20 w-20 rounded-md">
                    <a
                      title={`Visit ${item?.title}`}
                      href={item?.url}
                      className="text-stone-800 hover:text-stone-600 duration-200 transition-colors flex flex-col justify-center items-center gap-2 h-full w-full"
                      target="_blank">
                      {item?.icon !== undefined
                        ? convertSvgToComponent(item?.icon)
                        : null}
                      {item?.title}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>
          <div className="flex flex-col justify-center items-center gap-2 w-full px-8">
            <Tabs
              defaultValue="features"
              className="w-full mx-auto justify-center border border-stone-100 rounded-md">
              <TabsList className="flex mx-auto justify-center gap-4 bg-transparent">
                <TabsTrigger
                  value="features"
                  className="flex border rounded-md bg-transparent hover:bg-stone-200 text-stone-800 hover:text-stone-800 data-[state=active]:bg-stone-100 data-[state=active]:text-stone-800 py-2 px-4">
                  Key Features
                </TabsTrigger>
                <TabsTrigger
                  value="role"
                  className="flex border rounded-md bg-transparent hover:bg-stone-200 text-stone-800 hover:text-stone-800 data-[state=active]:bg-stone-100 data-[state=active]:text-stone-800 py-2 px-4">
                  My Dev Role
                </TabsTrigger>
              </TabsList>
              <TabsContent value="features" className="px-4">
                <Accordion type="single" collapsible className="w-full mx-auto">
                  {params?.features?.map(
                    (
                      feature: { title: string; description: string },
                      index: number,
                    ) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="flex w-full font-bold text-base mb-0 mx-auto justify-center gap-2">
                          {feature.title}
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="flex text-stone-800 mb-0 text-base">
                            {feature.description}
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    ),
                  )}
                </Accordion>
              </TabsContent>
              <TabsContent value="role" className="px-4">
                <p className="flex text-base text-stone-800 mb-4 mt-4">
                  {params.role}
                </p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        {/* <Separator className="my-2 w-2/3 mx-auto" /> */}
        <DialogFooter className="mt-4">
          <div className="flex flex-row items-center gap-2 justify-between w-full">
            <div className="flex flex-row justify-left items-center gap-1">
              {params?.links?.map(
                (
                  item: { title?: string; url?: string; icon?: string },
                  index: number,
                ) => (
                  <a
                    key={index}
                    title={`Visit ${item.title}`}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer noopener"
                    className={buttonVariants({
                      size: "icon",
                      variant: "ghost",
                      class:
                        "dark:text-white dark:underline dark:visited:text-white dark:visited:decoration-white",
                    })}>
                    {item?.icon !== undefined
                      ? convertSvgToComponent(item?.icon)
                      : null}
                  </a>
                ),
              )}
            </div>
            <div className="flex flex-col justify-center items-center gap-2">
              <p className="flex flex-row gap-1 text-stone-800 text-sm mb-0">
                Launched: {params.launchDate}
              </p>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;
