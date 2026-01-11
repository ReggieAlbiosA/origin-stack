import React from "react";;
import { Github } from "lucide-react";
import { SiNextdotjs } from "react-icons/si";

interface ArticleProps {
    title: string;
    description?: React.ReactNode;
    githubSrcLink?: string;
    officialDocsLink?: string;
    children?: React.ReactNode;
}

export async function Article({ title, description, githubSrcLink, officialDocsLink, children }: ArticleProps) {

    return (
        <article className="mx-auto px-6 py-8">

            <header className="mt-10">
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">{title}</h1>
                {description && <p className="mt-4 text-lg text-accent-foreground">{description}</p>}
            </header>

            <div className="mt-20 flex flex-col gap-y-6 ">

                <div className="justify-end flex gap-x-3">
                    <a
                        href={githubSrcLink || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={"flex text-[.9rem] items-center border-[1.5px] shadow-[0_0px_0px_0px_rgba(0,0,0,0.1)] dark:border-[#252527] gap-x-1 dark:bg-[#18181b] rounded-md px-3 py-1.5"}
                    >
                        <Github className="h-4 w-4 " />
                        <span className="lg:block md:block hidden">Sources</span>
                    </a>

                    <a
                        href={officialDocsLink || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={"flex items-center text-[.9rem] border-[1.5px] shadow-[0_0px_0px_0px_rgba(0,0,0,0.1)] dark:border-[#252527] gap-x-1 dark:bg-[#18181b] px-3 rounded-md py-1.5"}
                    >
                        <SiNextdotjs className="w-4 h-4  text-black dark:text-white" />
                        <span className="lg:block md:block hidden">Next.js</span>
                    </a>
                </div>

                {children}
            </div>
        </article>
    );
}
