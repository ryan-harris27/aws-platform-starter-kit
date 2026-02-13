import { Construct } from "constructs";
import { CfnBudget } from "aws-cdk-lib/aws-budgets";

export interface BudgetGuardrailProps {
  readonly monthlyBudgetAmount: number;
  readonly emailAddress: string;
  readonly budgetNamePrefix?: string;
}

export class BudgetGuardrail extends Construct {
  constructor(scope: Construct, id: string, props: BudgetGuardrailProps) {
    super(scope, id);

    const budgetName = `${props.budgetNamePrefix ?? "guardrail"}-monthly-budget`;

    new CfnBudget(this, "MonthlyBudget", {
      budget: {
        budgetName,
        budgetType: "COST",
        timeUnit: "MONTHLY",
        budgetLimit: {
          amount: props.monthlyBudgetAmount,
          unit: "USD",
        },
      },
      notificationsWithSubscribers: [
        {
          notification: {
            notificationType: "ACTUAL",
            comparisonOperator: "GREATER_THAN",
            threshold: 80,
            thresholdType: "PERCENTAGE",
          },
          subscribers: [
            {
              subscriptionType: "EMAIL",
              address: props.emailAddress,
            },
          ],
        },
        {
          notification: {
            notificationType: "ACTUAL",
            comparisonOperator: "GREATER_THAN",
            threshold: 100,
            thresholdType: "PERCENTAGE",
          },
          subscribers: [
            {
              subscriptionType: "EMAIL",
              address: props.emailAddress,
            },
          ],
        },
      ],
    });
  }
}