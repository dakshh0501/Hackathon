import type { EngineTripContext, Finding } from '../types.ts';
import { formatINR } from '../../lib/money.ts';

/**
 * Rule R5: Budget Overrun Check
 * Warns if estimated costs exceed the user-defined trip budget.
 */
export function checkBudgetOverrun(trip: EngineTripContext, estimatedTotalPaise: number): Finding[] {
  const findings: Finding[] = [];

  if (trip.budgetPaise > 0 && estimatedTotalPaise > trip.budgetPaise) {
    const overrunPaise = estimatedTotalPaise - trip.budgetPaise;
    findings.push({
      id: `r5_budget_overrun_${trip.id}`,
      rule: 'R5_BUDGET_OVERRUN',
      severity: 'warning',
      message: `Projected cost (${formatINR(estimatedTotalPaise)}) exceeds your set budget of ${formatINR(trip.budgetPaise)} by ${formatINR(overrunPaise)}. Consider adjusting hotel tier or removing high-ticket attractions.`,
      affectedItemIds: [],
    });
  }

  return findings;
}
