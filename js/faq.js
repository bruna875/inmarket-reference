// faq.js — Data Directory page

var FAQ_CATEGORIES = [
  {id: 'compliance',   label: 'Compliance',             fullLabel: 'Compliance'},
  {id: 'managerial',   label: 'Managerial Malice',      fullLabel: 'Managerial Malice'},
  {id: 'character',    label: 'Character Assassination', fullLabel: 'Character Assassination'},
  {id: 'hostile',      label: 'Hostile Work Env.',       fullLabel: 'Hostile Work Environment'},
  {id: 'health',       label: 'Health',                 fullLabel: 'Health'},
  {id: 'stereotyped',  label: 'Stereotypical Identifiers', fullLabel: 'Stereotypical Identifiers'},
  {id: 'power_abuse',  label: 'Power Abuse',              fullLabel: 'Power Abuse'}
];

var FAQ_ITEMS = [
  {
    cat: 'compliance',
    q: 'Has any unauthorized access to personal data occurred \u2014 potentially violating the principles of fairness and transparency and lacking a lawful basis for processing \u2014 during the relationship between the data subject and the data controller?',
    a: 'Under investigation. However, it is reasonably hypothesized that unauthorized access to devices and private Slack communications may have occurred, alongside patterns of undisclosed behavioral monitoring.',
    meta: {
      period: 'Continued',
      systems: ['Slack', 'Email', 'JumpCloud', 'Google Suite', 'Internal Databases'],
      keywords: [],
      details: null
    }
  },
  {
    cat: 'compliance',
    q: 'Has any unauthorized access to personal data occurred \u2014 potentially violating the principles of fairness and transparency and lacking a lawful basis for processing \u2014 after the relationship between the data subject and the data controller had concluded?',
    a: 'Under investigation. However, it is reasonably hypothesized that unauthorized access to Email and private Slack communications may have occurred, alongside patterns of undisclosed behavioral monitoring.',
    meta: {
      period: 'Continued',
      systems: ['Slack', 'Email', 'JumpCloud', 'Google Suite', 'Internal Databases'],
      keywords: [],
      details: null,
      attachments: [
        { label: 'Post-termination Access Documentation', url: 'https://drive.google.com/drive/folders/1ZpbKAC2b3pUGKms-sI_1jKM3PjGFOzgu?usp=drive_link' }
      ]
    }
  },
  {
    cat: 'compliance',
    q: 'Were the data subject\u2019s personal data processed in a non-compliant manner, departing from the principles of fairness and transparency, while their relationship with the data controller was still ongoing?',
    a: 'Under investigation. However, it is reasonably hypothesized that certain personal data were processed and utilized beyond the scope of the declared purposes (specifically, as criteria for professional evaluation). It is also suspected that those data contained inaccuracies, in violation of the principle of accuracy, and may require formal rectification.',
    meta: {
      period: 'Continued',
      systems: ['Internal Reports'],
      keywords: [],
      details: null
    }
  },
  {
    cat: 'compliance',
    q: 'Were the data subject\u2019s personal data processed in a non-compliant manner, departing from the principles of fairness and transparency and without any legitimate legal basis, after the relationship with the data controller had ended, and/or has a data breach occurred?',
    a: 'Under investigation. However, it is reasonably hypothesized that certain personal data were processed and utilized beyond the scope of the declared purposes (specifically, social engineering activities) following a data breach.',
    meta: {
      period: 'January 2026; February 2026',
      systems: ['Email', 'External Systems'],
      keywords: ['\u201cKudos\u201d', '\u201cLinkedIn\u201d'],
      details: 'Internal Interviews; External Providers',
      attachments: [
        { label: 'Data Breach Documentation', url: 'https://drive.google.com/drive/folders/1Uh9acjgyjVLlGc3JV9Yu_eUnpUcrkSQx?usp=drive_link' }
      ]
    }
  },
  {
    cat: 'compliance',
    q: 'Have any post-relationship retaliation attempts by internal managers occurred? If so, what measures were undertaken by the company?',
    a: 'Under investigation. However, the Company acted in accordance with established protocols once the hypothesis was reported, providing reassurances to the reporter and initiating the necessary internal investigations to verify the relevant accountability.',
    meta: {
      period: 'February 2026',
      systems: ['Internal Systems', 'External Systems'],
      keywords: ['\u201cKudos\u201d', '\u201cLinkedIn\u201d'],
      details: 'Internal Interviews; External Providers'
    }
  },
  {
    cat: 'managerial',
    q: 'Have there been instances of strategic obstruction involving the \u201cmoving the goalposts\u201d phenomenon, specifically aimed at hindering the data subject\u2019s professional advancement?',
    a: 'Under verification. Preliminary evidence suggests a pattern of strategic obstruction characterized by the systematic cancellation of alignment meetings and a consistent lack of responsiveness to formal inquiries regarding strategic direction and objective success criteria. Specific documented instances include:<br><br>'
      + '<b>Q4 Prioritization:</b> Formal requests via email for defined quarterly objectives remained unaddressed, preventing the establishment of measurable performance benchmarks.<br><br>'
      + '<b>Project \u201cSpeed Demon\u201d:</b> Detailed inquiries submitted on December 15th regarding project priorities received no feedback, impeding operational delivery.<br><br>'
      + '<b>Strategic Alignment:</b> The 1:1 document \u201cMultiplayer Notes for ****\u2019s Vision,\u201d developed to ensure cross-functional alignment with the Product team, was systematically disregarded; audit trails and file timestamps indicate a lack of contribution to the weekly 1:1 synchronization documents (e.g., \u201cNabru / ****\u201d), suggesting a failure in collaborative approach.<br><br>'
      + 'These omissions are hypothesized to effectively obstruct the data subject\u2019s ability to meet organizational objectives and performance expectations.',
    meta: {
      period: 'October 2025; November 2025; December 2025',
      systems: ['Email', 'Google Workspace (Shared Documents)', 'Slack'],
      keywords: ['\u201csuccess\u201d', '\u201cpriority(es)\u201d', '\u201croadmap\u201d', '\u201cQ4\u201d', '\u201cspeed demon\u201d', '\u201cdomino\u2019s pizza\u201d', '\u201caudience\u201d'],
      details: 'Objective success criteria were not shared by the direct manager, who consistently redirected the data subject to a secondary manager. The command chain appeared structurally compromised.'
    }
  },
  {
    cat: 'managerial',
    q: 'Were there attempts to induce the data subject into technical errors during a role evaluation process, with the potential intent of utilizing incorrect responses to negatively impact the assessments?',
    a: 'Under verification. Records indicate suggestive and manipulative \u201cguidance\u201d \u2014 such as encouraging via email the use of \u201cGeolink\u201d in response to Unified Platform inquiries \u2014 which appears designed to elicit incorrect technical responses, to later use such induced (potential) errors as a basis for performance critique.',
    meta: {
      period: 'October 2025; November 2025',
      systems: ['Email'],
      keywords: ['\u201cgeolink\u201d', '\u201cunified platform\u201d', '\u201cplatform\u201d'],
      details: 'The direct manager of the candidate for the role is in possession of a copy of this exchange, forwarded between October 2025 and November 2025.'
    }
  },
  {
    cat: 'managerial',
    q: 'Were irrelevant evaluation criteria presented as pertinent in order to misrepresent the data subject as incompetent for a specific role?',
    a: 'Under verification. It is hypothesized that non-sequitur inquiries, falling entirely outside the functional scope of Product Management, were utilized as proxies for \u201cbusiness sense.\u201d Specifically, knowledge regarding hospitality coffee pricing per gallon at B2B American events was presented as a relevant metric for assessing suitability for the role of Head of Product / Head of Product Development. This application of non-pertinent criteria suggests a departure from objective professional evaluation standards.',
    meta: {
      period: 'September 2025; October 2025',
      systems: ['Internal Reports', 'Meeting Minutes'],
      keywords: ['\u201cgallons\u201d', '\u201cprice\u201d', '\u201ccoffee\u201d', '\u201ccatering\u201d'],
      details: null
    }
  },
  {
    cat: 'managerial',
    q: 'Has there been a progressive divestment of responsibilities from the data subject, deliberately redirected toward \u201cshadow teams\u201d to operationally isolate the individual and obstruct their transition into a product leadership role?',
    a: 'Under verification. Evidence indicates that post-September 2025, a gradual reassignment of key projects to newly formed \u201cSLAM\u201d teams occurred without a documented strategic rationale, resulting in operational friction within the broader organization. Furthermore, specifically regarding the Measurement business unit, all cross-functional projects were removed from the roadmap effective March, leading to a cessation of collaborative activity for three consecutive quarters. These actions are hypothesized to represent a systematic operational isolation of the data subject.',
    meta: {
      period: 'September 2025; October 2025; November 2025; December 2025',
      systems: ['Email', 'Slack', 'Internal Reports'],
      keywords: ['\u201caudience\u201d', '\u201caudience builder\u201d', '\u201cai audience builder\u201d', '\u201cSOC2\u201d', '\u201cunified platform\u201d'],
      details: 'Cross-reference across multiple indicated Data Origins. Coordination required to obtain exact naming conventions for relevant entities.'
    }
  },
  {
    cat: 'character',
    q: 'Was there a systematic attempt to \u201cdiminish\u201d the data subject\u2019s professional standing by repeatedly misclassifying their role as \u201cDesigner\u201d or \u201cJunior,\u201d despite 15+ years of experience in Product Management and Entrepreneurship?',
    a: 'Under verification. Evidence indicates a persistent and documented misclassification of the data subject\u2019s professional profile. Despite an established 15-year background in Product Management and Entrepreneurship, the individual was consistently categorized within internal communications and organizational records as a \u201cDesigner\u201d or \u201cJunior\u201d resource. This deliberate mischaracterization is hypothesized to be a strategic effort to diminish organizational influence and delegitimize the data subject\u2019s authority in strategic decision-making processes, in violation of the principle of data accuracy to manipulate internal hierarchy and career progression.',
    meta: {
      period: 'Continued',
      systems: ['Email', 'Slack', 'Internal Reports', 'Meeting Minutes'],
      keywords: ['\u201cdesigner\u201d', '\u201cbusiness\u201d', '\u201cjunior\u201d', '\u201csenior\u201d'],
      details: null
    }
  },
  {
    cat: 'character',
    q: 'Was there a systematic misrepresentation and manipulation of legitimate and non-controversial events, framed as problematic, to defame the data subject\u2019s personal integrity and professional standing?',
    a: 'Under verification. Preliminary analysis suggests a pattern of \u201cnarrative framing\u201d where legitimate personal activities and professional flexibility were decontextualized to construct a malicious narrative of low integrity. This systematic misrepresentation appears to depart from the principles of fairness and accuracy. Key instances under investigation include:<br><br>'
      + '<b>Legit Working Location Choices:</b> The utilization of a beach-adjacent co-working space during Summer 2022 (for a limited duration of 15 entries) was retrospectively instrumentally characterized in 2025, after 3 years, as a lack of professionalism. This characterization contradicts the established \u201cWork from Anywhere\u201d corporate policy and ignores documented proof of payment for a dedicated professional workspace.<br><br>'
      + '<b>Administrative Assistance:</b> Good-faith coordination involving Italian consular authorities (Austin/Los Angeles) and local municipalities for passport renewal \u2014 supported by direct correspondence with government officials attached \u2014 was misrepresented as an ethical breach. This suggests a manipulative intent to reframe standard administrative procedures as integrity violations. The request itself appears designed to elicit responses that could be further manipulated, in a repeating pattern.<br><br>'
      + '<b>Decontextualized Communication:</b> The mention of moderate, personal alcohol consumption during a family dinner (Summer, 01:00 AM local time), included in a late-night response to a colleague to ensure operational continuity, was instrumentalized as \u201cconsumption during working hours.\u201d The request itself appears designed to elicit responses that could be further manipulated, in a repeating pattern.<br><br>'
      + '<b>PTO and Scheduling:</b> The exercise of legitimate Paid Time Off (PTO) for personal events and the strategic adjustment of working hours to ensure maximum overlap with cross-continental time zones (including availability after 11:00 PM local time for a duration of four years) were reframed as \u201clow productivity\u201d and \u201clack of discipline,\u201d respectively.<br><br>'
      + 'Audit logs and historical performance reviews confirm that no formal complaints regarding responsiveness or negligence were filed during the four-year tenure. Furthermore, the data subject\u2019s contractual framework did not include specific hourly constraints, rendering the scrutiny of private time usage a potential violation of privacy and professional dignity.',
    meta: {
      period: 'Continued',
      systems: ['Email', 'Slack', 'Internal Reports', 'Meeting Minutes'],
      keywords: ['\u201cco-working\u201d', '\u201ccoworking\u201d', '\u201cbeach\u201d', '\u201cwine\u201d', '\u201capp\u201d', '\u201cmorning\u201d', '\u201cconcert\u201d', '\u201cvacation\u201d', '\u201cpolicy\u201d', '\u201cpolicies\u201d', '\u201cpassport\u201d', '\u201ctrash\u201d', '\u201cconsulate\u201d', '\u201cetna rosso\u201d'],
      details: 'Cross-reference across multiple indicated Data Origins. Coordination required to obtain exact naming conventions for relevant entities.',
      attachments: [
        { label: 'Passport and Co-working proofs', url: 'https://drive.google.com/drive/folders/1h_sQ0aaf57-C_aTVxPpjusZWp8EP2iV6?usp=drive_link' }
      ]
    }
  },
  {
    cat: 'power_abuse',
    q: 'Was there a malicious re-evaluation of previously disclosed, personal, and legitimate external interests of the data subject?',
    a: 'Under verification. Evidence indicates a recent and inconsistent shift in the characterization of the data subject\u2019s external interests. Despite full transparency and prior formal disclosure regarding majority shareholdings in Italian legal entities \u2014 entities to which the Company has historically and documentedly processed payments \u2014 there has been a retrospective effort to reframe these interests as \u201cproblematic.\u201d Evidence confirms that the private vehicles in question maintain no operational, geographical, or commercial overlap with the Company, differing entirely in terms of target markets, business scale, client typology, and proprietary assets. Consequently, this sudden re-characterization appears inconsistent with prior corporate approvals and the established right to hold private equity, suggesting a tactical misrepresentation of disclosed facts to create a false narrative of non-compliance where no objective conflict of interest exists under established corporate standards.',
    meta: {
      period: 'Continued',
      systems: ['Procurement Records', 'Financial Audit Logs', 'Email'],
      keywords: ['\u201ckudos\u201d', '\u201csay kudos\u201d', '\u201cconflict of interests\u201d', '\u201cshareholder\u201d', '\u201cantonio\u201d', '\u201cfilippo\u201d', '\u201ccuebiq\u201d'],
      details: 'Verification of prior disclosure timestamps and historical approval of payments to the aforementioned entities to establish a baseline of corporate consent. Coordination required to obtain official cap table documentation and administrative documentation cross-referencing with the Company\u2019s conflict-of-interest policy. Connection with accountant already provided.'
    }
  },
  {
    cat: 'character',
    q: 'Have there been malicious and incorrect narratives regarding the management of corporate resources by the data subject?',
    a: 'Under verification. Preliminary analysis indicates the dissemination of narratives suggesting the misuse of company resources (e.g., travel expenses and family accompaniment during corporate retreats) which are fundamentally contradicted by financial records. Audit trails demonstrate a consistent pattern of high financial prudence and cost-mitigation efforts by the data subject. Documented instances of resource optimization include:<br><br>'
      + '<b>Voluntary Forfeiture of Entitlements:</b> The data subject consistently opted not to claim eligible meal allowances, co-working space reimbursements, mental health benefits, baggage fees, or agile development budgets.<br><br>'
      + '<b>Budgetary Efficiency:</b> The data subject proactively reported the lack of necessity for previously approved external contractors and proposed reallocating personal \u201cAgile Development\u201d funds to facilitate the retention of key personnel (e.g., employee Wei).<br><br>'
      + '<b>Asset and Logistics Optimization:</b> To minimize operational costs, the data subject repeatedly requested the cancellation of international shipments (e.g., corporate swag, event materials) and personally absorbed any incurred customs fees. Furthermore, personal assets (e.g., hardware/laptop) and external creative resources \u2014 funded via the data subject\u2019s independent entities \u2014 were utilized to meet critical company deadlines without additional charge to the Company.<br><br>'
      + '<b>Compensation Integrity:</b> Records indicate that the data subject never formally requested salary increases or promotions, even suggesting the conversion of potential salary adjustments into Unvested Account Rights (UARs) to preserve corporate liquidity.<br><br>'
      + 'These behaviors, verifiable through internal financial logs and testimonials from key personnel, suggest that the narrative of resource misuse is a factual misrepresentation, potentially constituting a defamatory action.',
    meta: {
      period: 'Continued',
      systems: ['Expense Management Systems (Expensify)', 'Email', 'Slack', 'HR and Financial Records'],
      keywords: ['\u201cexpenses\u201d', '\u201cretreat\u201d', '\u201cfamily\u201d', '\u201cparents\u201d', '\u201cmother\u201d', '\u201cdad\u201d', '\u201chotel\u201d', '\u201callowance\u201d', '\u201creimbursement\u201d', '\u201ctravel\u201d'],
      details: null
    }
  },
  {
    cat: 'power_abuse',
    q: 'Was there a formal request to update corporate policies specifically to legitimize and objectify a demonstrably false and defamatory narrative against the data subject?',
    a: 'Under verification. Preliminary analysis suggests an attempt to instrumentally modify internal corporate policies to retroactively justify the narratives identified. This potential strategic use of governance mechanisms appears designed to provide a veneer of legitimacy to non-objective critiques of the data subject\u2019s conduct. It is hypothesized that such efforts constitute an abuse of power by stakeholders, aimed at codifying a defamatory narrative into official company standards.',
    meta: {
      period: 'October 2025; November 2025; December 2025',
      systems: ['Internal Policy Documents', 'Meeting Minutes', 'Email', 'Slack'],
      keywords: ['\u201cpolicy\u201d', '\u201cpolicies\u201d', '\u201ccode of conduct\u201d', '\u201ccompliance\u201d', '\u201calcohol\u201d', '\u201cconflict of interests\u201d', '\u201camendment\u201d'],
      details: 'Cross-reference across multiple indicated Data Origins. Coordination required to obtain exact naming conventions for relevant entities. Cross-reference with Personal identifiers.'
    }
  },
  {
    cat: 'hostile',
    q: 'Was the data subject subjected to continuous, subtle provocations aimed at creating a Hostile Work Environment?',
    a: 'Under verification. Evidence suggests a persistent pattern of micro-aggressions and overt provocations strategically designed to undermine the data subject\u2019s professional standing and psychological well-being, meeting the structural criteria for a \u201cHostile Work Environment\u201d through multiple documented channels. This conduct is characterized by the systematic use of derogatory ethnic stereotypes and the weaponization of private information in professional contexts \u2014 including references to \u201cmafia,\u201d \u201cItalian bureaucracy,\u201d and \u201cItalians love taking on debt,\u201d alongside non-sequitur mentions of private geographical identifiers like \u201cvolcan\u201d and \u201cEtna rosso\u201d used as tools for subtle offenses. Furthermore, a consistent pattern of public professional disparagement has been identified on Slack and during plenary sessions, where professional output was labeled, for example, as \u201cAI-slop report for the Canadian government\u201d and a narrative of \u201cnavigating uncertainty\u201d was utilized to marginalize the data subject, complemented by explicit statements regarding the intent to \u201cdeconstruct piece by piece\u201d the proposed Product Development framework (or leader?). These incidents were frequently compounded by systemic insubordination and the deliberate bypassing of the established chain of command during meetings, actions clearly aimed at delegitimizing the data subject\u2019s authority and disrupting operational stability.',
    meta: {
      period: 'Continued',
      systems: ['Email', 'Slack', 'Recorded Meeting Sessions'],
      keywords: ['\u201cmafia\u201d', '\u201citalian\u201d', '\u201citalians\u201d', '\u201citalian bureaucracy\u201d', '\u201cdebt\u201d', '\u201cproduct proven process\u201d', '\u201camber\u201d', '\u201cproduct development\u201d', '\u201cpiece\u201d', '\u201cai slop\u201d', '\u201ccanadian government\u201d', '\u201cfrancesco ierace\u201d', '\u201cvolcan\u201d', '\u201cetna rosso\u201d', '\u201cux\u201d', '\u201cuser experience\u201d', '\u201cimmigration\u201d'],
      details: 'Cross-reference across multiple indicated Data Origins. Coordination required to obtain exact naming conventions for relevant entities. Cross-reference with Personal identifiers.'
    }
  },
  {
    cat: 'hostile',
    q: 'Was there a progressive attempt to isolate the data subject from their support network and operational structure to weaken their organizational standing and managerial support?',
    a: 'Under verification. Evidence suggests a systematic effort to achieve professional isolation through the deliberate exclusion of the data subject and their direct reports from critical strategic meetings and operational forums. This pattern of isolation was further reinforced by the removal of all projects requiring the data subject\u2019s involvement from the product roadmap \u2014 actions frequently masked as \u201cpriority shifts\u201d to obscure their exclusionary intent. Furthermore, documentation indicates attempts to alter reporting lines under the pretext of a \u201cneed for direct observation\u201d, exercising psychological pressure over the management, a maneuver hypothesized to effectively sever the data subject\u2019s connection to their established managerial support network and finalize their operational marginalization. These coordinated actions, ranging from roadmap manipulation to the restructuring of command chains, suggest a strategic intent to induce professional isolation and compromise the data subject\u2019s ability to perform their functional duties.',
    meta: {
      period: 'Continued',
      systems: ['Meeting Minutes', 'Internal Documents', 'Slack', 'Email'],
      keywords: ['\u201croadmap\u201d', '\u201cmeasurement\u201d', '\u201cjared\u201d', '\u201cana\u201d', '\u201cdesign\u201d', '\u201creporting line\u201d'],
      details: 'Deep dive with Internal Interviews; Cross-reference across multiple indicated Data Origins. Coordination required to obtain exact naming conventions for relevant entities. Cross-reference with Personal identifiers.'
    }
  },
  {
    cat: 'health',
    q: 'Did the cumulative impact of the continued obsessive monitoring, managerial malice, personal and professional attacks, provocations, isolation, and a hostile work environment affect the data subject\u2019s health?',
    a: 'Verified. Evidence confirms that, beginning in late July 2025 and following the documented intentional shift in the working environment observed between March and July 2025, the data subject manifested significant emotional distress and health complications necessitating specialized intervention. The Company formally acknowledged the severity of this condition by offering to subsidize psychological support as a remedial measure. Professional treatment continued on a weekly basis through January 2026, at which point the acute necessity for intervention began to stabilize, in coincidence with the data subject\u2019s resignation. The chronological correlation between the reported patterns of workplace hostility and the onset of the data subject\u2019s distress suggests a direct causal link between the environmental stressors and the resulting health impact.',
    meta: {
      period: 'July 2025; Continued',
      systems: ['Meeting Minutes', 'Internal Reports', 'Internal Documentation', 'Slack', 'Email'],
      keywords: ['\u201ccounselor\u201d', '\u201cinstability\u201d', '\u201cstability\u201d', '\u201cstabilization\u201d', '\u201cpressure\u201d', '\u201cbreakdown\u201d', '\u201ctherapist\u201d'],
      details: null,
      attachments: [
        { label: 'Health Documentation', url: 'https://drive.google.com/drive/folders/1LQ9FEsDkYlIBFWkFb8cVRjakuXXWJDC3?usp=drive_link' }
      ]
    }
  },
  {
    cat: 'health',
    q: 'Were the data subject\u2019s sensitive personal data \u2014 specifically relating to health / mental wellness issues induced by a hostile work environment \u2014 misrepresented to portray the individual as \u201cunstable,\u201d rather than as a direct consequence of workplace hostility?',
    a: 'Under verification. Evidence from direct managerial interactions and specific annotations within the September 2025 performance review suggests that the decline in the data subject\u2019s mental well-being, documented as a result of the reported workplace hostility, was instrumentally utilized as a rationale to obstruct professional advancement. This practice appears to constitute a non-compliant and abusive processing of sensitive personal data (Special Categories of Data under GDPR). Rather than addressing the environmental root causes, the resulting health impact was reframed as a personal performance deficit or \u201cinstability,\u201d effectively weaponizing medical-related distress to justify discriminatory career stagnation. Such utilization of sensitive information departs from the principles of fairness, purpose limitation, and lawfulness of processing, potentially violating the core protections afforded to data subjects regarding their health status.',
    meta: {
      period: 'August 2025; Continued',
      systems: ['Meeting Minutes', 'Internal Reports', 'Internal Documentation', 'Slack', 'Email'],
      keywords: ['\u201ccounselor\u201d', '\u201cinstability\u201d', '\u201cstability\u201d', '\u201cstabilization\u201d', '\u201cpressure\u201d', '\u201cbreakdown\u201d', '\u201ctherapist\u201d'],
      details: 'Comparative analysis of performance metrics prior to and following the onset of environmental hostility; audit of managerial notes to identify the specific transition where health-related distress began to be cited as a professional limitation; verification of compliance with GDPR requirements for processing health-related data within an employment context.'
    }
  },
  {
    cat: 'health',
    q: 'Did the data subject repeatedly report the health impacts of perceived hostility and hyper-monitoring prior to the emotional breakdown, and was any protective action taken following the July health crisis?',
    a: 'Verified / Under Investigation. Documentation confirms that between March and July 2025, prior to the reported clinical breakdown, the data subject repeatedly alerted leadership to the deteriorating working environment and its escalating impact on their mental health, as evidenced by internal 1:1 synchronization notes with the direct manager at the time. Following the acute emotional distress episode in July 2025, the Company\u2019s response was characterized by a fundamental contradiction: while it formally acknowledged the distress by offering subsidized psychological support, it simultaneously failed to implement protective measures to cease the hostile conduct. On the contrary, evidence suggests that attacks by specific managers not only persisted but deliberately intensified after August 2025. This failure to mitigate known environmental stressors, despite explicit warnings and a manifest health crisis, represents a documented breach of the \u201cduty of care\u201d and health and safety obligations, ultimately resulting in a forced cessation of work by the data subject to preserve their mental integrity.',
    meta: {
      period: 'August 2025; Continued; January 2026',
      systems: ['Meeting Minutes', 'Internal Reports', 'Internal Documentation', 'Slack', 'Email'],
      keywords: [],
      details: null,
      attachments: [
        { label: 'Health Documentation', url: 'https://drive.google.com/drive/folders/1LQ9FEsDkYlIBFWkFb8cVRjakuXXWJDC3?usp=drive_link' }
      ]
    }
  },
  {
    cat: 'stereotyped',
    q: 'Was the data subject targeted with repeated provocations based on their ethnic origin?',
    a: 'Under verification. Evidence from direct interactions indicates a consistent pattern of derogatory \u201cjokes\u201d and remarks centered on the data subject\u2019s national origin, specifically utilizing references to \u201cmafia,\u201d \u201cSicily,\u201d and \u201cItaly\u201d (e.g., \u201cItalian bureaucracy,\u201d \u201cEtna rosso\u201d). Furthermore, it is hypothesized that these ethnic identifiers were systematically weaponized in verbal communications to corroborate defamatory allegations of low productivity or operational inefficiency. This practice appears to involve the deliberate abuse of cultural stereotypes to rationalize professional disparagement, potentially violating corporate non-discrimination policies and statutory protections regarding workplace dignity. The investigation aims to determine the extent to which these ethnic tropes were used to construct a biased narrative of professional incompetence, thereby masking the objective performance of the data subject.',
    meta: {
      period: 'August 2025; September 2025; October 2025; November 2025; Continued',
      systems: ['Meeting Minutes', 'Internal Reports', 'Internal Documentation', 'Slack', 'Email'],
      keywords: ['\u201cmafia\u201d', '\u201citalian\u201d', '\u201citalians\u201d', '\u201citalian bureaucracy\u201d', '\u201cdebt\u201d', '\u201cetna rosso\u201d', '\u201csicily\u201d', '\u201csicilian\u201d', '\u201cisland\u201d', '\u201cvolcan\u201d'],
      details: null
    }
  },
  {
    cat: 'managerial',
    q: 'Have there been multiple and malicious instances of \u201cAccountability Shifting\u201d by teams responsible for systemic delays, specifically targeting the data subject?',
    a: 'Under verification. Evidence suggests a pattern of misattribution regarding project delays \u2014 specifically concerning the integration of the Measurement Suite. Internal project management timestamps and audit trails indicate that such delays originated within the Measurement Team, yet were formally or informally attributed to the data subject\u2019s functional area. Furthermore, it is hypothesized that a narrative regarding \u201clow ROI initiatives\u201d was disseminated to mask structural deficiencies in organizational design.',
    meta: {
      period: 'February 2025; March 2025; April 2025; May 2025; June 2025; July 2025',
      systems: ['Email', 'Slack', 'Internal Reports'],
      keywords: ['\u201cunified platform\u201d', '\u201cROI\u201d', '\u201cintegration\u201d', '\u201cdelay\u201d', '\u201cmeasurement suite\u201d'],
      details: 'Cross-reference across multiple indicated Data Origins. Coordination required to verify timestamp alignment between the Measurement Team\u2019s delivery logs and internal performance communications.'
    }
  },
  {
    cat: 'managerial',
    q: 'Can the identified patterns of \u201cManagerial Malice\u201d be attributed to evident conflicts of interest?',
    a: 'Under verification. Preliminary analysis suggests that the obstructive behaviors identified may stem from individuals holding specific personal interests \u2014 related to organizational status, resource control, and departmental influence \u2014 that appear structurally incompatible with the data subject\u2019s career progression. It is hypothesized that such actions were undertaken to safeguard internal power dynamics, or personal resentment, rather than to further organizational objectives. This potential alignment of personal professional gain with the systematic obstruction of a qualified individual suggests a breach of internal ethical standards and a conflict of interest in the execution of managerial duties.',
    meta: {
      period: 'Continued',
      systems: [],
      keywords: [],
      details: null
    }
  }
];

var _faqActiveCat = 'all';
var _faqOpenIdx   = -1;
var _faqView      = 'category'; // 'category' | 'timeline'

// ── Timeline buckets ──────────────────────────────────────────────────────────
var TIMELINE_BUCKETS = [
  { id: 'alltime', label: 'All Time / Ongoing' },
  { id: 'q1_25',  label: 'Q1 2025' },
  { id: 'q2_25',  label: 'Q2 2025' },
  { id: 'q3_25',  label: 'Q3 2025' },
  { id: 'q4_25',  label: 'Q4 2025' },
  { id: 'q1_26',  label: 'Q1 2026' },
  { id: 'q2_26',  label: 'Q2 2026' },
  { id: 'q3_26',  label: 'Q3 2026' },
  { id: 'q4_26',  label: 'Q4 2026' }
];

var _TL_MONTH_MAP = {
  'january 2025':'q1_25','february 2025':'q1_25','march 2025':'q1_25',
  'april 2025':'q2_25','may 2025':'q2_25','june 2025':'q2_25',
  'july 2025':'q3_25','august 2025':'q3_25','september 2025':'q3_25',
  'october 2025':'q4_25','november 2025':'q4_25','december 2025':'q4_25',
  'january 2026':'q1_26','february 2026':'q1_26','march 2026':'q1_26',
  'april 2026':'q2_26','may 2026':'q2_26','june 2026':'q2_26',
  'july 2026':'q3_26','august 2026':'q3_26','september 2026':'q3_26',
  'october 2026':'q4_26','november 2026':'q4_26','december 2026':'q4_26'
};

function faqPeriodToBuckets(period) {
  if (!period) return [];
  var p = period.toLowerCase();
  if (/continued/i.test(p)) return ['alltime'];
  var found = {};
  Object.keys(_TL_MONTH_MAP).forEach(function(m) {
    if (p.indexOf(m) !== -1) found[_TL_MONTH_MAP[m]] = true;
  });
  return Object.keys(found);
}

function faqCatLabel(catId) {
  var c = FAQ_CATEGORIES.filter(function(x) { return x.id === catId; })[0];
  return c ? (c.fullLabel || c.label) : catId;
}

function faqFilterItems() {
  if (_faqActiveCat === 'all') return FAQ_ITEMS;
  return FAQ_ITEMS.filter(function(i) { return i.cat === _faqActiveCat; });
}

function faqRenderTabs() {
  var calcSvg = '<svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="12" height="12" rx="2"/><path d="M5 5h2M9 5h2M5 8h2M9 8h2M5 11h2M9 11h2"/></svg>';
  var actCalc = _faqActiveCat === 'calc';
  var calcChip = '<div class="dd-tab-divider"></div>'
    + '<button class="dd-tab' + (actCalc ? ' act' : '') + '" data-faqcat="calc">'
    + calcSvg + 'Risk Calculator'
    + '</button>';

  if (_faqView === 'timeline') {
    // Quarter chips — only show buckets that have at least one item
    var populated = TIMELINE_BUCKETS.filter(function(b) {
      return FAQ_ITEMS.some(function(item) {
        return item.meta && faqPeriodToBuckets(item.meta.period).indexOf(b.id) !== -1;
      });
    });
    var qChips = [{id:'all', label:'All'}].concat(populated.map(function(b) {
      return {id: b.id, label: b.label};
    }));
    var chips = qChips.map(function(c) {
      var act = c.id === _faqActiveCat;
      return '<button class="dd-tab' + (act ? ' act' : '') + '" data-faqcat="' + c.id + '">' + c.label + '</button>';
    }).join('');
    return '<div class="dd-chips">' + chips + calcChip + '</div>';
  }

  // Category chips
  var tabs = [{id:'all', label:'All'}].concat(FAQ_CATEGORIES);
  var chips = tabs.map(function(c) {
    var act = c.id === _faqActiveCat;
    return '<button class="dd-tab' + (act ? ' act' : '') + '" data-faqcat="' + c.id + '">' + c.label + '</button>';
  }).join('');
  return '<div class="dd-chips">' + chips + calcChip + '</div>';
}

var ICO_PAPERCLIP = '<svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M13 7.5l-5.5 5.5a4 4 0 01-5.66-5.66l6-6a2.5 2.5 0 013.54 3.54L5.5 10.5a1 1 0 01-1.42-1.42L10 3"/></svg>';
var ICO_CLOCK  ='<svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="8" r="6"/><path d="M8 5v3.5l2 1.5"/></svg>';
var ICO_SERVER = '<svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="12" height="5" rx="1.5"/><rect x="2" y="9" width="12" height="5" rx="1.5"/><circle cx="12.5" cy="4.5" r="1" fill="currentColor" stroke="none"/><circle cx="12.5" cy="11.5" r="1" fill="currentColor" stroke="none"/></svg>';
var ICO_TAG    = '<svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 2h5.5l6.5 6.5-5.5 5.5L2 7.5V2z"/><circle cx="5" cy="5" r="1" fill="currentColor" stroke="none"/></svg>';
var ICO_SEARCH = '<svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="7" cy="7" r="4.5"/><path d="M10.5 10.5l3 3"/></svg>';

function faqRenderMeta(meta) {
  if (!meta) return '';
  var kwHtml = meta.keywords && meta.keywords.length
    ? meta.keywords.map(function(k) { return '<span class="faq-kw-chip">' + k + '</span>'; }).join('')
    : '<span class="faq-meta-dash">\u2014</span>';

  return '<div class="faq-meta">'
    + '<div class="faq-meta-row">'
    +   '<span class="faq-meta-icon">' + ICO_CLOCK + '</span>'
    +   '<span class="faq-meta-label">Period</span>'
    +   '<span class="faq-meta-value">' + (meta.period || '\u2014') + '</span>'
    + '</div>'
    + '<div class="faq-meta-row">'
    +   '<span class="faq-meta-icon">' + ICO_SERVER + '</span>'
    +   '<span class="faq-meta-label">Systems</span>'
    +   '<span class="faq-meta-value">' + (meta.systems && meta.systems.length ? meta.systems.join(', ') : '\u2014') + '</span>'
    + '</div>'
    + '<div class="faq-meta-row faq-meta-row--chips">'
    +   '<span class="faq-meta-icon">' + ICO_TAG + '</span>'
    +   '<span class="faq-meta-label">Keywords</span>'
    +   '<span class="faq-kw-wrap">' + kwHtml + '</span>'
    + '</div>'
    + '<div class="faq-meta-row">'
    +   '<span class="faq-meta-icon">' + ICO_SEARCH + '</span>'
    +   '<span class="faq-meta-label">Additional Details</span>'
    +   '<span class="faq-meta-value">' + (meta.details || '\u2014') + '</span>'
    + '</div>'
    + (meta.attachments && meta.attachments.length
      ? '<div class="faq-meta-row faq-meta-row--chips">'
        +   '<span class="faq-meta-icon">' + ICO_PAPERCLIP + '</span>'
        +   '<span class="faq-meta-label">Attachments</span>'
        +   '<span class="faq-kw-wrap">'
        +   meta.attachments.map(function(a) {
              return '<a class="faq-attach-chip" href="' + a.url + '" target="_blank" rel="noopener">'
                + '<svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v8M5 7l3 3 3-3"/><path d="M3 12h10"/></svg>'
                + a.label
                + '</a>';
            }).join('')
        +   '</span>'
        + '</div>'
      : '')
    + '</div>';
}

function faqRenderItem(item, showCatBadge) {
  var globalIdx = FAQ_ITEMS.indexOf(item);
  var isOpen    = globalIdx === _faqOpenIdx;
  var catBadge  = showCatBadge
    ? '<span class="dd-cat-badge">' + faqCatLabel(item.cat) + '</span>'
    : '';
  return '<div class="faq-item' + (isOpen ? ' open' : '') + '">'
    + '<div class="faq-question' + (isOpen ? ' open' : '') + '" data-faqtoggle="' + globalIdx + '">'
    + '<div class="faq-question-inner">'
    + '<span class="faq-question-text">' + item.q + '</span>'
    + catBadge
    + '</div>'
    + '<svg class="faq-chevron' + (isOpen ? ' open' : '') + '" width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 4.5l3 3 3-3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    + '</div>'
    + (isOpen ? '<div class="faq-answer">' + item.a + faqRenderMeta(item.meta) + '</div>' : '')
    + '</div>';
}

function faqRenderAccordion() {
  var items = faqFilterItems();
  if (items.length === 0) return '<div class="faq-empty">No items in this category.</div>';

  // Group by category, preserving FAQ_CATEGORIES order
  var cats = _faqActiveCat === 'all'
    ? FAQ_CATEGORIES.map(function(c) { return c.id; })
    : [_faqActiveCat];

  var html = '';
  cats.forEach(function(catId) {
    var group = items.filter(function(i) { return i.cat === catId; });
    if (!group.length) return;
    var label = faqCatLabel(catId);
    html += '<div class="faq-tl-section">'
      + '<div class="faq-tl-header">'
      + '<span class="faq-tl-label">' + label + '</span>'
      + '<span class="faq-tl-count">(' + group.length + ')</span>'
      + '</div>'
      + group.map(function(item) { return faqRenderItem(item, false); }).join('')
      + '</div>';
  });
  return html || '<div class="faq-empty">No items in this category.</div>';
}

function faqRenderTimeline() {
  // In timeline view _faqActiveCat is either 'all' or a bucket id
  var activeBucket = _faqActiveCat; // 'all' | 'alltime' | 'q1_25' | etc.

  var bucketsToRender = activeBucket === 'all'
    ? TIMELINE_BUCKETS
    : TIMELINE_BUCKETS.filter(function(b) { return b.id === activeBucket; });

  var html = '';
  bucketsToRender.forEach(function(bucket) {
    var items = FAQ_ITEMS.filter(function(item) {
      return item.meta && faqPeriodToBuckets(item.meta.period).indexOf(bucket.id) !== -1;
    });
    if (!items.length) return;
    html += '<div class="faq-tl-section">'
      + '<div class="faq-tl-header">'
      + '<span class="faq-tl-label">' + bucket.label + '</span>'
      + '<span class="faq-tl-count">(' + items.length + ')</span>'
      + '</div>'
      + items.map(function(item) { return faqRenderItem(item, true); }).join('')
      + '</div>';
  });
  return html || '<div class="faq-empty">No items for this period.</div>';
}

function faqRefreshTabs() {
  var t = document.getElementById('dd-tabs');
  if (t) t.innerHTML = faqRenderTabs();
}

function faqRefreshPanel() {
  var p = document.getElementById('faq-panel');
  if (!p) return;
  p.innerHTML = _faqView === 'timeline' ? faqRenderTimeline() : faqRenderAccordion();
}

function faqRefreshToggle() {
  var t = document.getElementById('dd-view-toggle');
  if (!t) return;
  t.querySelectorAll('[data-faqview]').forEach(function(btn) {
    btn.classList.toggle('act', btn.dataset.faqview === _faqView);
  });
}

function faqRefresh() {
  var isCalc  = _faqActiveCat === 'calc';
  var calcPanel = document.getElementById('dd-calc-panel');
  var divider   = document.querySelector('.dd-section-divider');
  var faqWrap   = document.querySelector('.faq-panel-wrap');
  if (calcPanel) calcPanel.style.display = isCalc ? 'block' : 'none';
  if (divider)   divider.style.display   = isCalc ? 'none' : '';
  if (faqWrap)   faqWrap.style.display   = isCalc ? 'none' : '';
  faqRefreshTabs();
  faqRefreshToggle();
  if (!isCalc) faqRefreshPanel();
}

function faqOpenRadarModal() {
  var existing = document.getElementById('radar-modal-overlay');
  if (existing) existing.remove();

  var overlay = document.createElement('div');
  overlay.id = 'radar-modal-overlay';
  overlay.className = 'modal-overlay';

  overlay.innerHTML =
    '<div class="modal-card" style="max-width:440px;">'
    + '<div class="modal-header">'
    + '<div style="display:flex;align-items:center;gap:8px;">'
    // Flag icon = segnalazione
    + '<svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 14V2"/><path d="M3 2h9l-2.5 3.5L12 9H3"/></svg>'
    + '<span class="modal-title">Any Data out of Radar?</span>'
    + '</div>'
    + '<button class="modal-close" id="radarModalClose">'
    + '<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 3l10 10M13 3L3 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>'
    + '</button>'
    + '</div>'
    + '<div class="modal-body">'
    + '<p class="modal-desc">We love crowdsourcing! The data in the directory are those directly observable by the data subject, but we’re sure there is much more. Please run searches against the suggested Data Origins and write to us, we’ll add them to the directory as soon as possible. Otherwise give me my data and I will proceed with categorization. Report export will update automatically: AI, baby. Workflow automation, baby. Git, baby. Rocket Science, baby. Really, Rocket Science.</p>'
    + '<a href="mailto:info@getrightshtuffdone.com" class="modal-email-btn">'
    + '<svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M2 4h12v9a1 1 0 01-1 1H3a1 1 0 01-1-1V4z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><path d="M2 4l6 5 6-5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    + 'Send Email'
    + '</a>'
    + '</div>'
    + '</div>';

  document.body.appendChild(overlay);
  document.getElementById('radarModalClose').addEventListener('click', function() { overlay.remove(); });
  overlay.addEventListener('click', function(e) { if (e.target === overlay) overlay.remove(); });
}


function faqRenderViewToggle() {
  return '<div class="tabnav" id="dd-view-toggle" style="margin-bottom:14px;">'
    + '<button class="tabitem' + (_faqView === 'category' ? ' act' : '') + '" data-faqview="category">By Category</button>'
    + '<button class="tabitem' + (_faqView === 'timeline' ? ' act' : '') + '" data-faqview="timeline">By Timeline</button>'
    + '</div>';
}

function renderFaqDsar() {
  _faqActiveCat = 'all';
  _faqOpenIdx   = -1;
  _faqView      = 'category';

  var faqMins = (function() {
    var text = FAQ_ITEMS.map(function(item) {
      return item.q + ' ' + item.a.replace(/<[^>]+>/g, ' ')
        + (item.meta && item.meta.details ? ' ' + item.meta.details : '');
    }).join(' ');
    var words = text.trim().split(/\s+/).length;
    return Math.ceil(words / 200);
  })();

  return '<div class="page-header">'
    + '<div><div class="ptitle">Data Directory</div>'
    + '<div class="psub psub-row">FAQ and Data Subject Access Request reference'
    + readTimeBadge(faqMins)
    + '</div></div>'
    + '<div style="display:flex;align-items:center;gap:8px;flex-shrink:0;">'

    // ── Secondary CTA ────────────────────────────────────────
    + '<button class="faq-radar-btn" id="radarBtn">'
    // Flag / pennant icon
    + '<svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 14V2"/><path d="M3 2h9l-2.5 3.5L12 9H3"/></svg>'
    + 'Any Data out of radar?'
    + '</button>'

    // ── Export Board Report ──────────────────────────────────
    + '<button class="faq-dsar-btn" id="dsarReportBtn">'
    + '<svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M4 2h5l4 4v8a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><path d="M9 2v4h4" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><path d="M6 9h4M6 11.5h3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>'
    + 'Export Board Report'
    + '</button>'

    + '</div>'
    + '</div>'

    // ── Quote ────────────────────────────────────────────────
    + '<blockquote class="res-quote">'
    + '\u201cFuror fit laesa saepius patientia.\u201d'
    + '<footer>\u2014 Publilio Siro, <em>Sententiae</em></footer>'
    + '</blockquote>'

    // ── View toggle ──────────────────────────────────────────
    + faqRenderViewToggle()

    // ── Tabs: chips + calc button all in one wrapper ─────────
    + '<div class="dd-tabs" id="dd-tabs">' + faqRenderTabs() + '</div>'

    // ── Inline Risk Calculator — directly below chips ────────
    + '<div id="dd-calc-panel" style="display:none;">' + renderCalculatorPanel() + '</div>'

    + '<div class="dd-section-divider"></div>'

    // ── Accordion ────────────────────────────────────────────
    + '<div class="faq-panel-wrap">'
    + '<div id="faq-panel">' + faqRenderAccordion() + '</div>'
    + '</div>';
}

document.addEventListener('click', function(e) {

  // Export Board Report
  if (e.target.closest('#dsarReportBtn')) {
    exportBoardReport();
    return;
  }

  // Radar modal
  if (e.target.closest('#radarBtn')) {
    faqOpenRadarModal();
    return;
  }

  // View toggle (By Category / By Timeline)
  var viewBtn = e.target.closest('[data-faqview]');
  if (viewBtn) {
    _faqView      = viewBtn.dataset.faqview;
    _faqActiveCat = 'all';
    _faqOpenIdx   = -1;
    faqRefresh();
    return;
  }

  // Category tabs
  var cat = e.target.closest('[data-faqcat]');
  if (cat) {
    _faqActiveCat = cat.dataset.faqcat;
    _faqOpenIdx   = -1;
    faqRefresh();
    return;
  }

  // Accordion toggle (works in both views)
  var tog = e.target.closest('[data-faqtoggle]');
  if (tog) {
    var idx = parseInt(tog.dataset.faqtoggle);
    _faqOpenIdx = _faqOpenIdx === idx ? -1 : idx;
    faqRefreshPanel();
    return;
  }
});
