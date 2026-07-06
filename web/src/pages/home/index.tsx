import { ArrowRight } from "lucide-react";
import { type ReactNode, useEffect, useState } from "react";
import { App, Button, Image, Tag } from "antd";
import { useNavigate } from "react-router-dom";

import { fetchPrompts, type Prompt } from "@/services/api/prompts";
import { navigationTools } from "@/constant/navigation-tools";
import { cn } from "@/lib/utils";

function Highlighter({ action, color, children }: { action: "highlight" | "underline"; color: string; children: ReactNode }) {
    return (
        <span className="relative inline-block px-1">
            {action === "highlight" ? (
                <span className="absolute inset-x-0 bottom-0 top-1 rounded-sm opacity-45" style={{ backgroundColor: color }} />
            ) : (
                <span className="absolute inset-x-0 bottom-0 h-1 rounded-full opacity-80" style={{ backgroundColor: color }} />
            )}
            <span className="relative font-medium text-stone-800 dark:text-stone-200">{children}</span>
        </span>
    );
}

export default function IndexPage() {
    const { message } = App.useApp();
    const navigate = useNavigate();
    const [primaryTool] = navigationTools;
    const [promptShowcase, setPromptShowcase] = useState<Prompt[]>([]);
    const [previewIndex, setPreviewIndex] = useState(0);
    const [previewOpen, setPreviewOpen] = useState(false);

    useEffect(() => {
        void fetchPrompts({ pageSize: 12 })
            .then((data) => setPromptShowcase(data.items))
            .catch((error) => message.error(error instanceof Error ? error.message : "获取提示词失败"));
    }, [message]);

    return (
        <main className="app-page-shell app-page-bg relative h-full">
            <section className="app-page-container relative min-h-[calc(100vh-4rem)]">
                <div className="app-page-hero relative min-h-[560px] px-6 py-16 text-center sm:px-10 lg:px-16">
                    <div className="pointer-events-none absolute -left-16 top-16 size-44 rounded-full border border-dashed border-border/80" />
                    <div className="pointer-events-none absolute -right-10 bottom-20 size-32 rounded-full border border-dashed border-border/80" />
                    <div className="mx-auto flex max-w-5xl flex-col items-center justify-center">
                        <span className="app-page-kicker">Creative Ops Canvas</span>
                        <h1 className="ai-title-aurora mt-7 max-w-5xl text-balance text-5xl font-semibold tracking-tight sm:text-7xl lg:text-8xl">无限画布</h1>
                        <p className="mt-8 max-w-3xl text-balance text-lg leading-8 text-muted-foreground">
                            在
                            <Highlighter action="underline" color="#FF9800">
                                无限画布
                            </Highlighter>
                            中生成、连接和重组
                            <Highlighter action="highlight" color="#87CEFA">
                                图片、文字与图形
                            </Highlighter>
                            ，让创作从单次生成变成连续推演。
                        </p>
                        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                        <Button type="primary" size="large" onClick={() => navigate(`/${primaryTool.slug}`)} icon={<ArrowRight className="size-4" />} iconPlacement="end">
                            开始使用
                        </Button>
                            <Button size="large" onClick={() => navigate("/canvas")}>
                                打开画布
                            </Button>
                        </div>
                    </div>
                </div>

                <section className="app-section-panel relative mx-auto mt-10 max-w-6xl p-6 sm:p-8">
                    <div className="mb-8 grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-start">
                        <div />
                        <div className="max-w-2xl text-center">
                            <h2 className="text-3xl font-semibold text-stone-950 dark:text-stone-100">沉淀每一次好结果</h2>
                            <p className="mt-3 text-base leading-7 text-stone-500 dark:text-stone-400">收藏稳定出图的提示词、参考风格和结果图片，让下一次创作从已有经验开始。</p>
                        </div>
                        <Button type="link" onClick={() => navigate("/prompts")} className="justify-self-center md:justify-self-end" icon={<ArrowRight className="size-4" />} iconPlacement="end">
                            查看提示词库
                        </Button>
                    </div>
                    <div className="grid auto-rows-[210px] gap-4 md:grid-cols-4">
                        {promptShowcase.map((item, index) => (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => {
                                    setPreviewIndex(index);
                                    setPreviewOpen(true);
                                }}
                                className={cn(
                                    "group relative cursor-pointer overflow-hidden rounded-2xl border border-border/80 bg-secondary text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl",
                                    index === 0 && "md:col-span-2 md:row-span-2",
                                    index === 3 && "md:col-span-2",
                                )}
                            >
                                {item.coverUrl?.trim() ? (
                                    <img src={item.coverUrl.trim()} alt={item.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-secondary text-xs text-muted-foreground">无封面</div>
                                )}
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/35 to-transparent p-4 text-white">
                                    <div className="mb-2 flex flex-wrap gap-1.5">
                                        {item.tags.slice(0, 2).map((tag) => (
                                            <Tag key={tag} variant="filled" className="m-0 bg-white/15 text-[11px] text-white backdrop-blur">
                                                {tag}
                                            </Tag>
                                        ))}
                                    </div>
                                    <h3 className="text-sm font-medium">{item.title}</h3>
                                    <p className="mt-1 line-clamp-2 text-xs leading-5 text-white/75">{item.prompt}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </section>
            </section>
            <Image.PreviewGroup
                preview={{
                    open: previewOpen,
                    current: previewIndex,
                    onOpenChange: setPreviewOpen,
                    onChange: setPreviewIndex,
                }}
            >
                <div className="hidden">
                    {promptShowcase
                        .filter((item) => item.coverUrl?.trim())
                        .map((item) => (
                            <Image key={item.id} src={item.coverUrl.trim()} alt={item.title} />
                        ))}
                </div>
            </Image.PreviewGroup>
        </main>
    );
}
