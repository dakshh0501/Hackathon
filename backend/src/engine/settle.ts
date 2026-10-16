export interface MemberBalance {
  memberId: string;
  name: string;
  paidPaise: number;
  sharePaise: number;
  netPaise: number; // positive = creditor (is owed), negative = debtor (owes)
}

export interface SettlementTransfer {
  fromMemberId: string;
  fromName: string;
  toMemberId: string;
  toName: string;
  amountPaise: number;
}

export interface SettlementResult {
  totalExpensePaise: number;
  balances: MemberBalance[];
  transfers: SettlementTransfer[];
}

/**
 * Group Expense Splitter & Settlement (Pure Function)
 * Computes net balances and settles debts with at most n - 1 transactions using a greedy creditor-debtor matcher.
 */
export function calculateSettlement(
  members: Array<{ id: string; name: string }>,
  expenses: Array<{
    id: string;
    paidById: string;
    amountPaise: number;
    splits: Array<{ memberId: string; sharePaise: number }>;
  }>
): SettlementResult {
  const memberMap = new Map<string, { name: string; paidPaise: number; sharePaise: number }>();

  for (const m of members) {
    memberMap.set(m.id, { name: m.name, paidPaise: 0, sharePaise: 0 });
  }

  let totalExpensePaise = 0;

  for (const exp of expenses) {
    totalExpensePaise += exp.amountPaise;

    // Add to paid amount
    const payer = memberMap.get(exp.paidById);
    if (payer) {
      payer.paidPaise += exp.amountPaise;
    }

    // Add shares
    for (const split of exp.splits) {
      const participant = memberMap.get(split.memberId);
      if (participant) {
        participant.sharePaise += split.sharePaise;
      }
    }
  }

  const balances: MemberBalance[] = [];
  const debtors: { memberId: string; name: string; amountOwed: number }[] = [];
  const creditors: { memberId: string; name: string; amountOwed: number }[] = [];

  for (const [id, data] of memberMap.entries()) {
    const netPaise = data.paidPaise - data.sharePaise;
    balances.push({
      memberId: id,
      name: data.name,
      paidPaise: data.paidPaise,
      sharePaise: data.sharePaise,
      netPaise,
    });

    if (netPaise < 0) {
      debtors.push({ memberId: id, name: data.name, amountOwed: -netPaise });
    } else if (netPaise > 0) {
      creditors.push({ memberId: id, name: data.name, amountOwed: netPaise });
    }
  }

  // Sort debtors & creditors descending to minimize number of transfers
  debtors.sort((a, b) => b.amountOwed - a.amountOwed);
  creditors.sort((a, b) => b.amountOwed - a.amountOwed);

  const transfers: SettlementTransfer[] = [];
  let dIdx = 0;
  let cIdx = 0;

  while (dIdx < debtors.length && cIdx < creditors.length) {
    const debtor = debtors[dIdx];
    const creditor = creditors[cIdx];

    const transferAmount = Math.min(debtor.amountOwed, creditor.amountOwed);

    if (transferAmount > 0) {
      transfers.push({
        fromMemberId: debtor.memberId,
        fromName: debtor.name,
        toMemberId: creditor.memberId,
        toName: creditor.name,
        amountPaise: transferAmount,
      });

      debtor.amountOwed -= transferAmount;
      creditor.amountOwed -= transferAmount;
    }

    if (debtor.amountOwed === 0) dIdx++;
    if (creditor.amountOwed === 0) cIdx++;
  }

  return {
    totalExpensePaise,
    balances,
    transfers,
  };
}
