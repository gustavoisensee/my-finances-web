import { RefObject } from "react";
import { euro } from "@/helpers/currency";
import { TrendingUp, Wallet, PiggyBank } from "lucide-react";
import cn from "classnames";

type Props = {
  totalIncome: number;
  totalBudgets: number;
  budgetsLeft: number;
  remainingCardRef: RefObject<HTMLDivElement>;
  placeholderRef: RefObject<HTMLDivElement>;
  isSticky: boolean;
};

export default function StatsCards({
  totalIncome,
  totalBudgets,
  budgetsLeft,
  remainingCardRef,
  placeholderRef,
  isSticky,
}: Props) {
  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      {/* Income and Budget Grid - 2 columns on mobile, 3 on desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        {/* Total Income */}
        <div className="flex flex-col items-center text-center sm:flex-row sm:text-left gap-2 sm:gap-4 p-4 sm:p-5 bg-success/10 rounded-2xl border border-success/20 shadow-sm">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-success/20">
            <TrendingUp className="w-6 h-6 text-success" />
          </div>
          <div>
            <p className="text-xs sm:text-sm text-base-content/50">
              Total Income
            </p>
            <p className="text-xl sm:text-2xl font-bold text-base-content">
              {euro(totalIncome)}
            </p>
          </div>
        </div>

        {/* Total Budget */}
        <div className="flex flex-col items-center text-center sm:flex-row sm:text-left gap-2 sm:gap-4 p-4 sm:p-5 bg-info/10 rounded-2xl border border-info/20 shadow-sm">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-info/20">
            <Wallet className="w-6 h-6 text-info" />
          </div>
          <div>
            <p className="text-xs sm:text-sm text-base-content/50">
              Total Budget
            </p>
            <p className="text-xl sm:text-2xl font-bold text-base-content">
              {euro(totalBudgets)}
            </p>
          </div>
        </div>

        {/* Budget Remaining - Desktop only (3rd column) */}
        <div className="hidden sm:flex items-center gap-4 p-5 bg-base-100 rounded-2xl border border-base-300 shadow-sm">
          <div
            className={cn(
              "flex items-center justify-center w-12 h-12 rounded-xl",
              budgetsLeft >= 0 ? "bg-warning/20" : "bg-error/20"
            )}
          >
            <PiggyBank
              className={cn(
                "w-6 h-6",
                budgetsLeft >= 0 ? "text-warning" : "text-error"
              )}
            />
          </div>
          <div>
            <p className="text-sm text-base-content/50">Remaining</p>
            <p
              className={cn(
                "text-2xl font-bold",
                budgetsLeft >= 0 ? "text-base-content" : "text-error"
              )}
            >
              {euro(budgetsLeft)}
            </p>
          </div>
        </div>
      </div>

      {/* Budget Remaining - Mobile only */}
      <div
        ref={remainingCardRef}
        className={cn(
          "sm:hidden flex items-center gap-4 p-4 bg-base-100",
          isSticky
            ? "fixed top-16 left-0 right-0 z-30 shadow-lg border-y border-base-300 animate-slide-down"
            : "relative rounded-2xl border border-base-300 shadow-sm"
        )}
      >
        <div
          className={cn(
            "flex items-center justify-center w-12 h-12 rounded-xl",
            budgetsLeft >= 0 ? "bg-warning/20" : "bg-error/20"
          )}
        >
          <PiggyBank
            className={cn(
              "w-6 h-6",
              budgetsLeft >= 0 ? "text-warning" : "text-error"
            )}
          />
        </div>
        <div>
          <p className="text-xs text-base-content/50">Remaining</p>
          <p
            className={cn(
              "text-xl font-bold",
              budgetsLeft >= 0 ? "text-base-content" : "text-error"
            )}
          >
            {euro(budgetsLeft)}
          </p>
        </div>
      </div>

      {/* Placeholder to prevent layout jump when card becomes fixed */}
      <div
        ref={placeholderRef}
        className={cn("sm:hidden", isSticky ? "block h-20" : "hidden")}
      />
    </div>
  );
}
