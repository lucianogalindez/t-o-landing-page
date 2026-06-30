import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface ReviewSummary {
  totalReviewCount: number;
  averageRating: number;
}

const fallbackSummary: ReviewSummary = {
  totalReviewCount: 4,
  averageRating: 5,
};

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/place/T%26O+Construction+LLC/@42.0369155,-71.6835355,17z/data=!3m1!4b1!4m6!3m5!1s0x89e4453265e1f991:0xa63a0067bf263d8!8m2!3d42.0369155!4d-71.6835355!16s%2Fg%2F11knx14h1x";

const GoogleLogo = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" aria-label="Google" role="img">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

export const Testimonials = () => {
  const [summary, setSummary] = useState<ReviewSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const fetchSummary = async () => {
      try {
        const res = await fetch(
          `https://n8n-n8n.agjjtd.easypanel.host/webhook/get-reviews?t=${Date.now()}`,
          {
            headers: { "x-api-key": "tando_reviews_2026_2026" },
            cache: "no-store",
            signal: controller.signal,
          }
        );
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();
        const entry = Array.isArray(data) ? data[0] : data;
        setSummary(entry?.summary ?? fallbackSummary);
      } catch {
        setSummary(fallbackSummary);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSummary();
    return () => controller.abort();
  }, []);

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
          What Our Clients Say
        </h2>

        {isLoading ? (
          <div className="inline-flex items-center gap-5 px-6 py-4 rounded-2xl border border-border bg-card">
            <Skeleton className="w-9 h-9 rounded-full" />
            <div className="w-px h-10 bg-border" />
            <div className="flex flex-col gap-2 items-start">
              <Skeleton className="h-7 w-32" />
              <Skeleton className="h-3.5 w-44" />
            </div>
          </div>
        ) : summary ? (
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-5 px-6 py-4 rounded-2xl border border-border bg-card hover:border-foreground/20 transition-colors"
          >
            <GoogleLogo />
            <div className="w-px h-10 bg-border" />
            <div className="flex flex-col items-start gap-1">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-foreground leading-none">
                  {summary.averageRating.toFixed(1)}
                </span>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.round(summary.averageRating)
                          ? "fill-[#FBBC05] text-[#FBBC05]"
                          : "text-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <span className="text-sm text-muted-foreground">
                Based on {summary.totalReviewCount} Google reviews ↗
              </span>
            </div>
          </a>
        ) : null}
      </div>
    </section>
  );
};
