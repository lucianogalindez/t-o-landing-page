import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ChevronDown, ChevronUp } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

interface Review {
  authorName: string;
  rating: number;
  comment: string;
  date: string;
  profilePhotoUrl?: string;
}

interface ReviewSummary {
  totalReviewCount: number;
  averageRating: number;
}

const fallbackReviews: Review[] = [
  {
    authorName: "John M.",
    rating: 5,
    comment: "T&O Construction did an amazing job on our kitchen renovation. The attention to detail and cleanliness throughout the project was impressive. Highly recommend!",
    date: "2025-12-01",
  },
  {
    authorName: "Sarah L.",
    rating: 5,
    comment: "Professional, reliable, and skilled. They replaced all our windows and the difference in energy efficiency is remarkable. Great communication from start to finish.",
    date: "2025-11-15",
  },
  {
    authorName: "Michael R.",
    rating: 5,
    comment: "From the initial consultation to project completion, T&O Construction exceeded our expectations. Our new deck and exterior improvements look fantastic!",
    date: "2025-10-20",
  },
];

const fallbackSummary: ReviewSummary = {
  totalReviewCount: 3,
  averageRating: 5,
};

const INITIAL_COUNT = 3;
const BATCH_SIZE = 3;

const SkeletonCard = () => (
  <Card className="border-none shadow-md">
    <CardContent className="pt-6">
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="w-5 h-5 rounded-sm" />
        ))}
      </div>
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-3/4 mb-4" />
      <div className="border-t pt-4 flex items-center gap-3">
        <Skeleton className="h-9 w-9 rounded-full" />
        <div>
          <Skeleton className="h-4 w-24 mb-1" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
    </CardContent>
  </Card>
);

export const Testimonials = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [summary, setSummary] = useState<ReviewSummary | null>(null);
  const [isGoogle, setIsGoogle] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  useEffect(() => {
    const controller = new AbortController();
    const fetchReviews = async () => {
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
        if (entry?.reviews?.length > 0 && entry?.summary) {
          setReviews(entry.reviews);
          setSummary(entry.summary);
          setIsGoogle(true);
        } else {
          setReviews(fallbackReviews);
          setSummary(fallbackSummary);
        }
      } catch {
        setReviews(fallbackReviews);
        setSummary(fallbackSummary);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReviews();
    return () => controller.abort();
  }, []);

  const isExpanded = visibleCount >= reviews.length;
  const visibleReviews = reviews.slice(0, visibleCount);

  const handleToggle = useCallback(() => {
    if (isExpanded) {
      setVisibleCount(INITIAL_COUNT);
    } else {
      setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, reviews.length));
    }
  }, [isExpanded, reviews.length]);

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Our Clients Say
          </h2>
          {isLoading ? (
            <Skeleton className="h-5 w-64 mx-auto" />
          ) : isGoogle && summary ? (
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.round(summary.averageRating)
                          ? "fill-accent text-accent"
                          : "text-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-semibold text-foreground">
                  {summary.averageRating.toFixed(1)}
                </span>
              </div>
              <p className="text-muted-foreground">
                Rated on Google · Based on {summary.totalReviewCount} reviews
              </p>
            </div>
          ) : (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it—hear from homeowners we've helped
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {isLoading
            ? [...Array(3)].map((_, i) => <SkeletonCard key={i} />)
            : visibleReviews.map((review, index) => (
                <Card
                  key={index}
                  className="border-none shadow-md"
                  style={{
                    animation:
                      index >= visibleCount - BATCH_SIZE
                        ? `fade-in 0.4s ease-out ${(index % BATCH_SIZE) * 0.08}s both`
                        : undefined,
                  }}
                >
                  <CardContent className="pt-6">
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < review.rating
                              ? "fill-accent text-accent"
                              : "text-muted-foreground/30"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic">
                      "{review.comment}"
                    </p>
                    <div className="border-t pt-4 flex items-center gap-3">
                      {review.profilePhotoUrl && (
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={review.profilePhotoUrl} alt={review.authorName} />
                          <AvatarFallback className="text-xs">
                            {review.authorName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div>
                        <p className="font-semibold text-foreground">{review.authorName}</p>
                        {review.date && (
                          <p className="text-sm text-muted-foreground">
                            {new Date(review.date).toLocaleDateString("en-US", {
                              month: "short",
                              year: "numeric",
                            })}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
        </div>

        {!isLoading && reviews.length > INITIAL_COUNT && (
          <div className="flex justify-center mt-10">
            <button
              onClick={handleToggle}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm tracking-wide hover:opacity-90 transition-opacity duration-200 shadow-md"
            >
              {isExpanded ? (
                <>View Less <ChevronUp className="h-4 w-4" /></>
              ) : (
                <>View More Reviews <ChevronDown className="h-4 w-4" /></>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
