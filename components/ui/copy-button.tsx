import { Button } from "@/components/ui/button";
import { trackResultsCopied } from "@/lib/analytics";
import { CircleCheckBig, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function CopyButton({
  guessCount,
  result,
  text,
  id,
}: Readonly<{
  guessCount: number;
  id: number;
  result: "lost" | "won";
  text: string;
}>) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`Rockbusters #${id}

${text}
https://rockbusters.lol/`);
      trackResultsCopied({
        dayId: id,
        guessCount,
        progress: text,
        result,
      });
      setIsCopied(true);
      toast.success("Results copied");
      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    } catch {
      toast.error("Error copying results");
    }
  };

  return (
    <Button onClick={handleCopy}>
      {isCopied ? (
        <CircleCheckBig className="mr-2 w-4 h-4" />
      ) : (
        <Copy className="mr-2 w-4 h-4" />
      )}
      Copy results
    </Button>
  );
}

export default CopyButton;
