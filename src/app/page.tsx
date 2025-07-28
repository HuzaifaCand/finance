import Button from "@/components/ui/Button";
import { aquire } from "./layout";

export default function Home() {
  return (
    <div className="text-left min-h-screen bg-background px-8 py-8">
      <h1
        className={`text-4xl text-moreWhite font-medium mb-2 ${aquire.className}`}
      >
        Finance<span className="text-teal">HK</span>
      </h1>
      <p className="text-md text-muted font-light">Tracker</p>
      <div className="flex flex-col justify-left  sm:flex-row gap-4">
        <Button variant="fill" text="First" />
        <Button variant="nofill" text="Second" />
      </div>
    </div>
  );
}
