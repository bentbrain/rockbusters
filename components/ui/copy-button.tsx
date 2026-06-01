import { Button } from "@/components/ui/button";
import { CircleCheckBig, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function CopyButton({ text, id }: Readonly<{ text: string; id: number }>) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`Rockbusters #${id}

${text}
https://rockbusters.lol/`);
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
