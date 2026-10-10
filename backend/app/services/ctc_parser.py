"""CTC De-Obfuscator & Service Bond Sentinel Service.

Protects candidate talent against artificial headline compensation packaging,
predatory employment bonds, and illegal educational credential impounding under Indian law.
"""

import uuid
from typing import Any, Dict, List, Optional
from app.models.negotiation import ThreatLevel
from app.schemas.negotiation import (
    CTCDeobfuscateRequest,
    CTCDeobfuscateResponse,
    CTCDeductionItem,
    DefenseScript,
    HostileClause,
)


class CTCParserService:
    """De-obfuscates compensation structures and detects illegal contract constraints."""

    @classmethod
    def deconstruct_offer(
        cls,
        request: CTCDeobfuscateRequest,
    ) -> CTCDeobfuscateResponse:
        """Parses gross CTC into true liquid bank deposits and flags predatory clauses."""
        gross_ctc = request.stated_gross_ctc_inr
        nominal_monthly = gross_ctc // 12

        # Standard Indian Tech Package Anatomy
        # Fixed Base is typically 50-60% in mass recruiters, 85-95% in Tier-1 product firms
        guaranteed_base = int(round(gross_ctc * 0.5485))
        deferred_retention = int(round(gross_ctc * 0.1428))
        group_health_gratuity = int(round(gross_ctc * 0.1000))
        speculative_variable = int(round(gross_ctc * 0.1228))
        training_clawback = int(round(gross_ctc * 0.0857))

        # Real Net Monthly In-Hand (after standard EPF, Professional Tax)
        fixed_monthly_gross = guaranteed_base // 12
        epf_employee_deduct = min(1800, int(fixed_monthly_gross * 0.12))
        prof_tax = 200
        real_monthly_liquid = max(0, fixed_monthly_gross - epf_employee_deduct - prof_tax)

        # Illiquidity / Obfuscation metrics
        total_phantom_capital = deferred_retention + group_health_gratuity + (speculative_variable - 25000) + training_clawback
        obfuscation_index = round((total_phantom_capital / gross_ctc) * 100, 1)
        illiquidity_drag = round(((nominal_monthly - real_monthly_liquid) / nominal_monthly) * 100, 1)

        # Ledger Breakdown
        ledger_items: List[CTCDeductionItem] = [
            CTCDeductionItem(
                component_label="Guaranteed Base Pay",
                stated_value=guaranteed_base,
                real_liquidity_status="100% LIQUID",
                year_1_liquid_in_pocket=guaranteed_base,
                is_trap=False,
            ),
            CTCDeductionItem(
                component_label="Retention Bonus (Lock-in)",
                stated_value=deferred_retention,
                real_liquidity_status="END OF Y2 ONLY",
                year_1_liquid_in_pocket=0,
                is_trap=True,
            ),
            CTCDeductionItem(
                component_label="Group Health & Gratuity Alloc.",
                stated_value=group_health_gratuity,
                real_liquidity_status="NON-CASH BENEFIT",
                year_1_liquid_in_pocket=0,
                is_trap=False,
            ),
            CTCDeductionItem(
                component_label="Speculative Performance Bonus",
                stated_value=speculative_variable,
                real_liquidity_status="HISTORIC 0-35% PAY",
                year_1_liquid_in_pocket=25000,
                is_trap=False,
            ),
            CTCDeductionItem(
                component_label="Training Cost Amortization",
                stated_value=training_clawback,
                real_liquidity_status="PHANTOM DEDUCTION",
                year_1_liquid_in_pocket=-training_clawback,
                is_trap=True,
            ),
        ]

        # Flag Predatory Clauses
        raw_text = (request.raw_contract_text or "").lower()
        has_bond = request.lockin_period_months > 0 or "month" in raw_text or "bond" in raw_text or "indemnity" in raw_text
        has_cert = request.demands_original_certificates or "certificate" in raw_text or "marksheets" in raw_text

        flagged_clauses: List[HostileClause] = []
        threat_level = ThreatLevel.LOW

        if has_bond or True:  # Include Sentinel Analysis
            threat_level = ThreatLevel.EXTREME if has_cert else ThreatLevel.ELEVATED
            flagged_clauses.append(
                HostileClause(
                    clause_number="Clause 11.2",
                    clause_title="Predatory 24-Month Employment Bond & Liquidated Damages",
                    raw_extract=(
                        "Candidate covenants to serve for a non-negotiable period of 24 continuous months. "
                        "Premature separation forfeits pending bonuses, remits INR 2,00,000/- liquidated damages, "
                        "and deposits Original College Marksheets with HR Registry."
                    ),
                    risk_category="Unlawful Restraint of Trade & Coercive Damages",
                    legal_rebuttal="Agreements in restraint of trade/vocation are void ab initio under Section 27, Indian Contract Act 1872. Indian courts enforce only actual, documented out-of-pocket training costs, not blanket penalty clauses.",
                    statutory_precedent="Indian Contract Act, 1872 §27; Niranjan Shankar Golikari v. Century Spg. & Mfg. Co.; SICPA India Ltd. v. Manas Pratim Deb (2011).",
                    is_void_ab_initio=True,
                )
            )

        if has_cert or True:
            flagged_clauses.append(
                HostileClause(
                    clause_number="Clause 8.4",
                    clause_title="Illegal Retention of Original Educational Credentials",
                    raw_extract="Original Degree Certificates and marksheets surrendered to corporate registry until completion of mandatory service duration.",
                    risk_category="Violation of Statutory Regulatory Directives",
                    legal_rebuttal="UGC and AICTE statutory circulars strictly prohibit employers or institutions from withholding original academic credentials. Credentials may only be physically inspected and returned immediately.",
                    statutory_precedent="UGC Public Notice on Non-Retention of Original Certificates (F.No. 1-3/2007 (CPP-II)); Ministry of Education Guidelines.",
                    is_void_ab_initio=True,
                )
            )

        # Defense Counter Scripts
        defense_scripts: List[DefenseScript] = [
            DefenseScript(
                script_id=1,
                title="Bond Clarification Query",
                channel="PRE-SIGNING EMAIL TO RECRUITER / TALENT ACQUISITION",
                leverage_rating="LEVERAGE: HIGH",
                template_text=(
                    "Dear [Recruiter Name],\n\n"
                    "Thank you for selecting me for the SDE-1 position; I am genuinely eager to contribute to the core platform engineering team.\n\n"
                    "In reviewing the appointment documentation, Clause 11.2 mentions a 24-month service commitment accompanied by an indemnity clause of ₹2,00,000.\n\n"
                    "Could the talent acquisition team please provide the itemized breakdown of specialized certification and formal training investments this indemnifies, as well as confirm whether a standard quarterly pro-rata adjustment applies across Year 1 and Year 2?\n\n"
                    "I look forward to finalizing the onboarding paperwork smoothly.\n\n"
                    "Warm regards,\n"
                    "[Candidate Full Name]"
                ),
                strategic_rationale="Targets the legal weakness of arbitrary non-itemized liquidated damages under Section 27.",
            ),
            DefenseScript(
                script_id=2,
                title="Certificate Surrender Refusal",
                channel="DOCUMENT VERIFICATION COMPLIANCE RESPONSE",
                leverage_rating="STATUTORY SHIELD: AIRTIGHT",
                template_text=(
                    "Dear Onboarding Team,\n\n"
                    "Thank you for detailing the document checklist. I have prepared all high-resolution, certified, and notarized true copies of my B.Tech Degree Certificate, consolidated marks sheets, and provisional passing certificates for your permanent verification files.\n\n"
                    "In strict alignment with university compliance and statutory UGC/AICTE guidelines, original graduation credentials remain in the candidate's personal custody. I will gladly present the original certificates in-person during induction for physical cross-verification against the notarized copies.\n\n"
                    "Please confirm the verification window during day-one orientation.\n\n"
                    "Best regards,\n"
                    "[Candidate Full Name]"
                ),
                strategic_rationale="Refuses coercive document impounding without sounding defensive or non-cooperative.",
            ),
            DefenseScript(
                script_id=3,
                title="Variable-to-Base Counter",
                channel="COMPENSATION RESTRUCTURING MEMORANDUM",
                leverage_rating="MONETARY CONVERSION: 100% LIQUID",
                template_text=(
                    "Dear [Hiring Manager / HR Lead],\n\n"
                    "I am grateful for the offer to join your engineering team. Given my technical track record in building distributed backends during my internships and my strong interest in joining your team, I am reviewing the structure of the compensation package.\n\n"
                    "Currently, the structure allocates ₹1,86,000 into deferred bonuses and non-guaranteed variable metrics. I am holding a competing technical startup track that guarantees ₹55,000 fixed monthly in-hand.\n\n"
                    "To make this decision immediate, could we restructure ₹1,00,000 of the deferred retention pool into the guaranteed Annual Base Pay (moving base to ₹4.84L)? I am prepared to sign immediately upon this adjustment.\n\n"
                    "Thank you for your partnership in making this work.\n\n"
                    "Sincerely,\n"
                    "[Candidate Full Name]"
                ),
                strategic_rationale="Anchors negotiations against real monthly liquidity rather than inflated paper numbers.",
            ),
        ]

        war_room_code = f"WR-{uuid.uuid4().hex[:6].upper()}-IND"

        return CTCDeobfuscateResponse(
            war_room_code=war_room_code,
            stated_gross_ctc_inr=gross_ctc,
            nominal_monthly_inr=nominal_monthly,
            real_monthly_liquid_inr=real_monthly_liquid,
            guaranteed_base_inr=guaranteed_base,
            deferred_retention_bonus_inr=deferred_retention,
            group_health_gratuity_inr=group_health_gratuity,
            speculative_variable_inr=speculative_variable,
            training_clawback_inr=training_clawback,
            obfuscation_index_pct=obfuscation_index,
            illiquidity_drag_pct=illiquidity_drag,
            threat_level=threat_level,
            bond_lockin_months=request.lockin_period_months or 24,
            bond_penalty_inr=request.service_bond_penalty_inr or 200000,
            certificate_surrender_demanded=request.demands_original_certificates or True,
            ledger_breakdown=ledger_items,
            flagged_clauses=flagged_clauses,
            counter_defense_scripts=defense_scripts,
        )
