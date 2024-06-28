import { Skeleton } from "@/components/ui/skeleton"


export default function Loading() {


    return (
        <div className="flex items-center flex-col space-x-4 space-y-3">
            <Skeleton className="min-h-[630px] h-full w-full mt-5 bg-zinc-500" />
            
        </div>
    )
}