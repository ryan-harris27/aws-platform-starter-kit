# RFC-0001: Multi-Account AWS Guardrails

## Problem
We manage multiple AWS accounts for internal teams. Without guardrails, teams can accidentally:
- leave logging disabled
- overspend budgets
- create security gaps (public S3, wide IAM permissions)
- violate compliance

## Goals
- Provide baseline account safety
- Reduce accidental overspend / misconfigurations
- Make rules reusable via CDK constructs
- Keep implementation simple to start

## Non-Goals
- Solve every edge-case for every team
- Implement complex automated remediation (future work)
- Replace team-level responsibility

## Proposed Guardrails
1. SCP: deny leaving org
2. SCP: deny disabling CloudTrail
3. Require MFA on root accounts
4. Default encryption for EBS volumes
5. Block public S3 buckets by default
6. Central logging account enforced
7. CloudWatch spend alerts for budgets
8. Restrict regions to approved list
9. IAM key rotation policies
10. Tagging enforcement for cost allocation

## Rollout Plan
1. Implement each guardrail as a separate CDK construct
2. Deploy to a single test account first
3. Review and approve via PR
4. Merge RFC → use as source of truth for implementation
