// export.js — Board Report DOCX export

function exportBoardReport() {
  var D = window.docx || (typeof docx !== 'undefined' ? docx : null);
  if (!D || !D.Document || !D.Packer) {
    alert('Export library not loaded yet — please wait a moment and try again.');
    return;
  }

  // Load latest calc state
  calcLoad();
  calcInitRows();

  var today   = new Date();
  var dateStr = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  var fileDate = today.getFullYear() + '_'
    + String(today.getMonth() + 1).padStart(2, '0') + '_'
    + String(today.getDate()).padStart(2, '0');

  // ── Palette ──────────────────────────────────────────────────────────────
  var ACCENT       = '3A7FC1';  // medium blue (coming soon badge text)
  var ACCENT_LIGHT = 'DEEEFF';  // light blue  (coming soon badge bg)
  var ACCENT_DARK  = '1A4A7A';  // dark blue   (text on light bg)
  var GRAY         = '64748B';
  var BORDER_CLR   = 'B8D4EF';  // blue-tinted border
  var RED          = 'DC2626';
  var AMBER        = 'D97706';
  var WHITE        = 'FFFFFF';
  var ROW_ALT      = 'F4F9FF';  // very light blue alt row

  // ── Layout ───────────────────────────────────────────────────────────────
  var PAGE_W    = 11906;
  var MARGIN    = 1134;
  var CW        = PAGE_W - 2 * MARGIN;

  // ── Borders ──────────────────────────────────────────────────────────────
  var brd      = { style: D.BorderStyle.SINGLE, size: 1, color: BORDER_CLR };
  var borders  = { top: brd, bottom: brd, left: brd, right: brd };

  // ── Helpers ──────────────────────────────────────────────────────────────
  function spacer(n) {
    return new D.Paragraph({ spacing: { before: n || 200, after: 0 }, children: [new D.TextRun('')] });
  }

  function hr(color) {
    return new D.Paragraph({
      border: { bottom: { style: D.BorderStyle.SINGLE, size: 6, color: color || ACCENT, space: 1 } },
      spacing: { before: 0, after: 120 },
      children: [new D.TextRun('')]
    });
  }

  function fmtDollar(n) {
    if (!n) return '$0';
    return '$' + Math.round(n).toLocaleString('en-US');
  }

  function cell(text, o) {
    o = o || {};
    return new D.TableCell({
      borders: borders,
      width:   { size: o.w || Math.floor(CW / 2), type: D.WidthType.DXA },
      shading: o.fill ? { fill: o.fill, type: D.ShadingType.CLEAR } : undefined,
      margins: { top: 80, bottom: 80, left: 140, right: 140 },
      verticalAlign: D.VerticalAlign.CENTER,
      children: [new D.Paragraph({
        alignment: o.align || D.AlignmentType.LEFT,
        children: [new D.TextRun({
          text:    text,
          font:    'Arial',
          size:    o.size  || 20,
          bold:    o.bold  || false,
          italics: o.italic || false,
          color:   o.color || '111827'
        })]
      })]
    });
  }

  // ── Collect calc data ─────────────────────────────────────────────────────
  var sections = CALC_SECTIONS.map(function(sec) {
    var rows = (_calcRows[sec.id] || []).filter(function(r) {
      return r.item && r.item !== 'Select item...' && parseFloat(r.value) > 0;
    });
    return { label: sec.label, rows: rows, total: calcSectionTotal(sec.id) };
  });
  var grandTotal = calcGrandTotal();

  // ── Collect FAQ data ──────────────────────────────────────────────────────
  function getFaqByCategory(catId) {
    return FAQ_ITEMS.filter(function(i) { return i.cat === catId; });
  }
  function stripHtml(s) {
    return s.replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  }
  function truncate(s, max) {
    return s.length > max ? s.slice(0, max - 1) + '\u2026' : s;
  }

  // ── Board-level summaries (governance tone) ───────────────────────────────
  var BOARD_SUM = {
    compliance: [
      {
        q: 'Unauthorized data access during active employment',
        a: 'Under investigation. Evidence supports hypothesis of unauthorized device and Slack access, alongside undisclosed behavioral monitoring, in potential breach of fairness and transparency principles.'
      },
      {
        q: 'Unauthorized data access following termination',
        a: 'Under investigation. Unauthorized post-termination access to email and Slack communications hypothesized, consistent with patterns of undisclosed monitoring beyond lawful basis.'
      },
      {
        q: 'Non-compliant personal data processing during employment',
        a: 'Under investigation. Personal data allegedly processed beyond declared purposes and used as criteria for professional evaluation; potential accuracy violations identified, requiring formal rectification.'
      },
      {
        q: 'Non-compliant processing and potential data breach post-termination',
        a: 'Under investigation. Personal data allegedly exploited for social engineering activities following a data breach; processing conducted without lawful basis in violation of applicable regulations.'
      },
      {
        q: 'Post-termination retaliation by internal management',
        a: 'Under investigation. Company initiated established protocols upon receipt of report; internal accountability investigations commenced and formal reassurances provided to the reporting party.'
      }
    ],
    managerial: [
      {
        q: 'Strategic obstruction via systematic goal-shifting',
        a: 'Preliminary evidence of recurring cancellation of alignment meetings and deliberate withholding of quarterly objectives. Documented failure to define success criteria effectively prevented performance benchmarking.'
      },
      {
        q: 'Deliberate induction of technical errors during leadership evaluation',
        a: 'Records indicate manipulative guidance specifically designed to elicit technically incorrect responses, subsequently leveraged as grounds for negative performance assessment of the role candidate.'
      },
      {
        q: 'Application of irrelevant criteria to misrepresent candidate competency',
        a: 'Non-sequitur inquiries outside Product Management scope were used as proxies for professional aptitude. Pattern represents a material departure from objective evaluation standards.'
      },
      {
        q: 'Operational isolation via responsibility reassignment to undisclosed teams',
        a: 'Post-September 2025: key projects reassigned to newly formed SLAM teams without documented strategic rationale. Measurement BU cross-functional projects suspended for three consecutive quarters, constituting systematic isolation.'
      },
      {
        q: 'Systematic misattribution of project delays to the data subject',
        a: 'Audit trails indicate Measurement Suite delays originated within the Measurement Team yet were formally attributed to the data subject. A \'low ROI\' narrative is hypothesized to have been disseminated to mask structural organizational deficiencies.'
      },
      {
        q: 'Obstructive behaviors attributable to undisclosed conflicts of interest',
        a: 'Obstructive patterns hypothesized to derive from personal interests in organizational status and resource control that are structurally incompatible with the data subject\'s advancement — representing a potential breach of internal ethical standards.'
      }
    ],
    character: [
      {
        q: 'Systematic misclassification as junior or designer resource',
        a: 'Despite 15+ years in Product Management and Entrepreneurship, internal records consistently categorized the data subject at junior level — hypothesized as a deliberate strategy to undermine organizational authority and obstruct career progression.'
      },
      {
        q: 'Decontextualization of legitimate activities to fabricate an integrity narrative',
        a: 'Key instances: co-working space use reframed as unprofessional (contradicting Work from Anywhere policy); consular administrative assistance misrepresented as ethical breach; PTO and cross-continental time-zone availability reframed as low productivity. No formal complaints on record during tenure.'
      },
      {
        q: 'Retroactive mischaracterization of disclosed external shareholdings',
        a: 'Fully disclosed Italian entities — historically recipients of Company payments — retroactively reframed as conflicts of interest. No operational or commercial overlap confirmed; re-characterization is inconsistent with prior corporate approvals.'
      },
      {
        q: 'False narrative of corporate resource misuse contradicted by audit records',
        a: 'Financial audit trails confirm consistent prudence: unreimbursed eligible expenses, proactive budget reallocation, personal asset utilization to meet company deadlines, and absence of any salary increase requests throughout a four-year tenure.'
      },
      {
        q: 'Instrumental policy amendments to legitimize defamatory narrative',
        a: 'Preliminary evidence of attempts to modify internal corporate policies to retroactively codify non-objective critiques of the data subject\'s conduct — constituting a potential abuse of equity-based governance mechanisms.'
      }
    ]
  };

  BOARD_SUM.hostile = [
    {
      q: 'Sustained hostile work environment through ethnic targeting and professional disparagement',
      a: 'Pattern of derogatory ethnic stereotyping (references to mafia, Italian bureaucracy, national debt), weaponization of private identifiers, and public denigration of professional output (\'AI-slop\', \'navigating uncertainty\'). Explicit statements of intent to \'deconstruct\' the data subject\'s framework and systematic bypassing of the chain of command identified across Slack and recorded sessions.'
    },
    {
      q: 'Systematic isolation from support network and operational structure',
      a: 'Evidence of deliberate exclusion from strategic meetings and forums, removal of projects from the roadmap masked as \'priority shifts\', and attempted restructuring of reporting lines under the pretext of \'direct observation\'. Coordinated actions hypothesized to sever managerial support and induce operational marginalization.'
    }
  ];

  BOARD_SUM.health = [
    {
      q: 'Documented health impact causally linked to sustained workplace hostility',
      a: 'Verified. Significant emotional distress and health complications onset from late July 2025, following documented environmental deterioration (March–July 2025). Company formally acknowledged severity by subsidizing psychological support. Weekly professional treatment continued through January 2026, stabilizing upon resignation. Chronological correlation constitutes evidence of a causal link and potential breach of employer\'s duty of care and health & safety obligations.'
    },
    {
      q: 'Non-compliant processing of health data to obstruct professional advancement',
      a: 'Under verification. Annotations in the September 2025 performance review indicate health-related distress was reframed as personal instability and used to justify career stagnation. This constitutes potential abusive processing of Special Categories of Data (GDPR), departing from fairness, purpose limitation, and lawfulness principles, rather than addressing the documented environmental root causes.'
    },
    {
      q: 'Failure of duty of care: hostile conduct intensified post-crisis despite formal acknowledgment',
      a: 'Verified / Under Investigation. Data subject issued documented alerts to leadership (March–July 2025) via 1:1 notes prior to clinical breakdown. Company acknowledged distress by subsidizing psychological support, yet simultaneously failed to halt hostile conduct — which evidence suggests deliberately intensified post-August 2025. Breach of duty of care resulted in forced cessation of work to preserve the data subject\'s mental integrity.'
    }
  ];

  BOARD_SUM.stereotyped = [
    {
      q: 'Sustained ethnic targeting through derogatory stereotyping and weaponized cultural identifiers',
      a: 'Under verification. Pattern of derogatory remarks referencing national origin (mafia, Sicily, Italian bureaucracy, Etna rosso) identified across documented interactions. Ethnic identifiers hypothesized to have been systematically used to construct a biased narrative of professional incompetence, potentially violating non-discrimination policies and statutory workplace dignity protections.'
    }
  ];

  var faqCompliance   = getFaqByCategory('compliance');
  var faqManagerial   = getFaqByCategory('managerial');
  var faqCharacter    = getFaqByCategory('character');
  var faqHostile      = getFaqByCategory('hostile');
  var faqHealth       = getFaqByCategory('health');
  var faqStereotyped  = getFaqByCategory('stereotyped');
  var faqPowerAbuse   = getFaqByCategory('power_abuse');

  // ─────────────────────────────────────────────────────────────────────────
  // COVER PAGE
  // ─────────────────────────────────────────────────────────────────────────
  var cover = [
    spacer(2800),
    new D.Paragraph({
      alignment: D.AlignmentType.CENTER,
      children: [new D.TextRun({ text: 'CONFIDENTIAL', font: 'Arial', size: 18, bold: true, color: RED, characterSpacing: 100 })]
    }),
    spacer(480),
    new D.Paragraph({
      alignment: D.AlignmentType.CENTER,
      children: [new D.TextRun({ text: 'Objective Risk Assessment', font: 'Arial', size: 56, bold: true, color: ACCENT })]
    }),
    spacer(200),
    new D.Paragraph({
      alignment: D.AlignmentType.CENTER,
      children: [new D.TextRun({ text: 'Board Report  \u2014  Very Good Peeps', font: 'Arial', size: 26, color: GRAY })]
    }),
    spacer(200),
    hr(BORDER_CLR),
    spacer(160),
    new D.Paragraph({
      alignment: D.AlignmentType.CENTER,
      children: [new D.TextRun({ text: dateStr + '  |  Prepared for Board Review', font: 'Arial', size: 22, color: GRAY })]
    }),
    spacer(3200),
    new D.Paragraph({
      alignment: D.AlignmentType.CENTER,
      children: [new D.TextRun({ text: 'Total Estimated Exposure', font: 'Arial', size: 22, color: GRAY })]
    }),
    spacer(80),
    new D.Paragraph({
      alignment: D.AlignmentType.CENTER,
      children: [new D.TextRun({ text: fmtDollar(grandTotal), font: 'Arial', size: 80, bold: true, color: ACCENT })]
    }),
    new D.Paragraph({ children: [new D.PageBreak()] })
  ];

  // ─────────────────────────────────────────────────────────────────────────
  // SECTION 1 — EXECUTIVE SUMMARY
  // ─────────────────────────────────────────────────────────────────────────
  var c1a = Math.floor(CW * 0.50);
  var c1b = Math.floor(CW * 0.25);
  var c1c = CW - c1a - c1b;

  var execRows = [
    new D.TableRow({
      tableHeader: true,
      children: [
        cell('Risk Domain', { bold: true, fill: ACCENT_LIGHT, color: ACCENT_DARK, w: c1a }),
        cell('Exposure',    { bold: true, fill: ACCENT_LIGHT, color: ACCENT_DARK, w: c1b, align: D.AlignmentType.RIGHT }),
        cell('Status',      { bold: true, fill: ACCENT_LIGHT, color: ACCENT_DARK, w: c1c })
      ]
    })
  ].concat(sections.map(function(sec, i) {
    var bg = i % 2 === 0 ? WHITE : ROW_ALT;
    return new D.TableRow({ children: [
      cell(sec.label,                              { fill: bg, w: c1a }),
      cell(fmtDollar(sec.total),                   { fill: bg, w: c1b, align: D.AlignmentType.RIGHT }),
      cell(sec.total > 0 ? 'Assessed' : 'Pending', {
        fill: bg, w: c1c, color: sec.total > 0 ? '059669' : '9CA3AF', bold: sec.total > 0
      })
    ]});
  })).concat([
    new D.TableRow({ children: [
      cell('TOTAL ESTIMATED EXPOSURE', { bold: true, fill: ACCENT_LIGHT, color: ACCENT_DARK, w: c1a }),
      cell(fmtDollar(grandTotal),       { bold: true, fill: ACCENT_LIGHT, color: ACCENT_DARK, w: c1b, align: D.AlignmentType.RIGHT }),
      cell('',                          { fill: ACCENT_LIGHT, w: c1c })
    ]})
  ]);

  var exec = [
    new D.Paragraph({
      heading: D.HeadingLevel.HEADING_1,
      children: [new D.TextRun({ text: '1.  Executive Summary', font: 'Arial', size: 32, bold: true, color: ACCENT })]
    }),
    hr(),
    spacer(80),
    new D.Paragraph({
      spacing: { after: 180 },
      children: [new D.TextRun({
        text: 'This report presents a formal assessment of organizational risk exposure arising from documented, continued patterns of workplace misconduct directed against a senior Product Leadership candidate over the last 12 months (March 2025 \u2013 March 2026), with potential post-resignation extension. Evidence has been consolidated across six risk categories: Compliance & Data Protection, Managerial Malice, Character Assassination, Hostile Work Environment, Health Impact, and Stereotypical Identifiers. The report is structured to support Board-level decision-making regarding individual accountability, legal exposure, and governance remediation.',
        font: 'Arial', size: 22, color: '374151'
      })]
    }),
    new D.Paragraph({
      spacing: { after: 180 },
      children: [new D.TextRun({
        text: 'The investigation identifies a systemic and coordinated pattern of misconduct that escalated progressively from 2024 through the data subject\u2019s forced resignation in January 2026. Key findings include: (1) Data protection violations \u2014 unauthorized access to personal data and communications during and following the employment relationship, with evidence of post-termination data breach exploited for social engineering purposes; (2) Six documented patterns of Managerial Malice, including strategic goal-shifting, manipulation of evaluation criteria, operational isolation via undisclosed team restructuring (SLAM), and systematic misattribution of project delays \u2014 actions hypothesized to derive from undisclosed conflicts of interest; (3) Five documented patterns of Character Assassination, including professional misclassification, weaponization of personal disclosures, and attempted policy amendments to retroactively legitimize defamatory narratives; (4) A sustained Hostile Work Environment characterized by derogatory ethnic stereotyping, public professional disparagement, and coordinated operational exclusion.',
        font: 'Arial', size: 22, color: '374151'
      })]
    }),
    new D.Paragraph({
      spacing: { after: 280 },
      children: [new D.TextRun({
        text: 'Health Impact is formally verified: documented emotional distress and clinical-level health complications, onset from July 2025, are directly attributable to workplace hostility. The Company\u2019s failure to cease hostile conduct following formal acknowledgment of the health crisis \u2014 and its continuation through the data subject\u2019s departure \u2014 constitutes a documented breach of the employer\u2019s duty of care and health and safety obligations. The total estimated financial exposure across Legal, Compliance, Reputational, and Corporate Asset risk domains is detailed below. The Board is requested to review Section 4 and authorize immediate accountability and remediation measures.',
        font: 'Arial', size: 22, color: '374151'
      })]
    }),
    new D.Table({ width: { size: CW, type: D.WidthType.DXA }, columnWidths: [c1a, c1b, c1c], rows: execRows }),
    new D.Paragraph({ children: [new D.PageBreak()] })
  ];

  // ─────────────────────────────────────────────────────────────────────────
  // SECTION 2 — RISK EXPOSURE BREAKDOWN
  // ─────────────────────────────────────────────────────────────────────────
  var c2a = Math.floor(CW * 0.65);
  var c2b = CW - c2a;

  var breakdown = [
    new D.Paragraph({
      heading: D.HeadingLevel.HEADING_1,
      children: [new D.TextRun({ text: '2.  Risk Exposure Breakdown', font: 'Arial', size: 32, bold: true, color: ACCENT })]
    }),
    hr()
  ];

  sections.forEach(function(sec, si) {
    breakdown.push(spacer(240));
    breakdown.push(new D.Paragraph({
      heading: D.HeadingLevel.HEADING_2,
      children: [new D.TextRun({ text: '2.' + (si + 1) + '  ' + sec.label, font: 'Arial', size: 26, bold: true, color: '1E293B' })]
    }));

    var secRows = [
      new D.TableRow({
        tableHeader: true,
        children: [
          cell('Item',   { bold: true, fill: ACCENT_LIGHT, color: ACCENT_DARK, w: c2a }),
          cell('Amount', { bold: true, fill: ACCENT_LIGHT, color: ACCENT_DARK, w: c2b, align: D.AlignmentType.RIGHT })
        ]
      })
    ];

    if (sec.rows.length > 0) {
      sec.rows.forEach(function(row, ri) {
        var bg = ri % 2 === 0 ? WHITE : ROW_ALT;
        secRows.push(new D.TableRow({ children: [
          cell(row.item,                               { fill: bg, w: c2a }),
          cell(fmtDollar(parseFloat(row.value) || 0),  { fill: bg, w: c2b, align: D.AlignmentType.RIGHT })
        ]}));
      });
    } else {
      secRows.push(new D.TableRow({ children: [
        cell('[No items entered \u2014 add data in the Risk Calculator]', { fill: WHITE, w: c2a, color: '9CA3AF', italic: true }),
        cell('\u2014', { fill: WHITE, w: c2b, color: '9CA3AF', align: D.AlignmentType.RIGHT })
      ]}));
    }

    secRows.push(new D.TableRow({ children: [
      cell('Subtotal \u2014 ' + sec.label, { bold: true, fill: ACCENT_LIGHT, color: ACCENT_DARK, w: c2a }),
      cell(fmtDollar(sec.total),            { bold: true, fill: ACCENT_LIGHT, color: ACCENT_DARK, w: c2b, align: D.AlignmentType.RIGHT })
    ]}));

    breakdown.push(new D.Table({ width: { size: CW, type: D.WidthType.DXA }, columnWidths: [c2a, c2b], rows: secRows }));
  });

  breakdown.push(new D.Paragraph({ children: [new D.PageBreak()] }));

  // ─────────────────────────────────────────────────────────────────────────
  // SECTION 3 — DOCUMENTED RISK INDICATORS
  // ─────────────────────────────────────────────────────────────────────────
  var c3n  = Math.floor(CW * 0.04);
  var c3q  = Math.floor(CW * 0.40);
  var c3a  = Math.floor(CW * 0.34);
  var c3p  = Math.floor(CW * 0.13);
  var c3at = CW - c3n - c3q - c3a - c3p;

  function faqBlock(catLabel, catKey, items, startIdx) {
    var rows = [];
    var sumList = BOARD_SUM[catKey] || [];

    // Sub-header
    rows.push(new D.TableRow({
      children: [
        new D.TableCell({
          borders: borders,
          columnSpan: 5,
          shading: { fill: ACCENT_LIGHT, type: D.ShadingType.CLEAR },
          margins: { top: 80, bottom: 80, left: 140, right: 140 },
          children: [new D.Paragraph({
            children: [new D.TextRun({ text: catLabel.toUpperCase(), font: 'Arial', size: 18, bold: true, color: ACCENT_DARK, characterSpacing: 60 })]
          })]
        })
      ]
    }));

    items.forEach(function(item, idx) {
      var n    = String(startIdx + idx + 1);
      var bg   = idx % 2 === 0 ? WHITE : ROW_ALT;
      var sum  = sumList[idx];
      var qTxt = sum ? sum.q : truncate(item.q, 160);
      var aTxt = sum ? sum.a : truncate(stripHtml(item.a), 260);
      var per  = item.meta && item.meta.period ? item.meta.period : '\u2014';
      var attList = item.meta && item.meta.attachments && item.meta.attachments.length
        ? item.meta.attachments.map(function(a) { return a.label; }).join(', ')
        : '\u2014';
      rows.push(new D.TableRow({ children: [
        cell(n,       { fill: bg, w: c3n,  align: D.AlignmentType.CENTER, color: GRAY }),
        cell(qTxt,    { fill: bg, w: c3q,  bold: true, size: 18 }),
        cell(aTxt,    { fill: bg, w: c3a,  color: '374151', size: 18 }),
        cell(per,     { fill: bg, w: c3p,  color: GRAY, size: 17, italic: true }),
        cell(attList, { fill: bg, w: c3at, color: ACCENT, size: 17 })
      ]}));
    });
    return rows;
  }

  var allFaqRows = [
    new D.TableRow({
      tableHeader: true,
      children: [
        cell('#',           { bold: true, fill: ACCENT_LIGHT, color: ACCENT_DARK, w: c3n,  align: D.AlignmentType.CENTER }),
        cell('Finding',     { bold: true, fill: ACCENT_LIGHT, color: ACCENT_DARK, w: c3q }),
        cell('Status',      { bold: true, fill: ACCENT_LIGHT, color: ACCENT_DARK, w: c3a }),
        cell('Period',      { bold: true, fill: ACCENT_LIGHT, color: ACCENT_DARK, w: c3p }),
        cell('Attachments', { bold: true, fill: ACCENT_LIGHT, color: ACCENT_DARK, w: c3at })
      ]
    })
  ]
  .concat(faqBlock('Compliance', 'compliance', faqCompliance, 0))
  .concat(faqBlock('Managerial Malice', 'managerial', faqManagerial, faqCompliance.length))
  .concat(faqBlock('Character Assassination', 'character', faqCharacter, faqCompliance.length + faqManagerial.length))
  .concat(faqBlock('Hostile Work Environment', 'hostile', faqHostile, faqCompliance.length + faqManagerial.length + faqCharacter.length))
  .concat(faqBlock('Health', 'health', faqHealth, faqCompliance.length + faqManagerial.length + faqCharacter.length + faqHostile.length))
  .concat(faqBlock('Stereotypical Identifiers', 'stereotyped', faqStereotyped, faqCompliance.length + faqManagerial.length + faqCharacter.length + faqHostile.length + faqHealth.length))
  .concat(faqBlock('Power Abuse', 'power_abuse', faqPowerAbuse, faqCompliance.length + faqManagerial.length + faqCharacter.length + faqHostile.length + faqHealth.length + faqStereotyped.length));

  var indicators = [
    new D.Paragraph({
      heading: D.HeadingLevel.HEADING_1,
      children: [new D.TextRun({ text: '3.  Documented Risk Indicators', font: 'Arial', size: 32, bold: true, color: ACCENT })]
    }),
    hr(),
    spacer(80),
    new D.Paragraph({
      spacing: { after: 280 },
      children: [new D.TextRun({
        text: 'The following risk indicators have been identified and documented across the Data Directory. Each entry represents a pattern of incidents or behavioral signals with measurable legal, compliance, reputational, or operational implications. Categories without entries are currently under preparation.',
        font: 'Arial', size: 22, color: '374151'
      })]
    }),
    new D.Table({
      width: { size: CW, type: D.WidthType.DXA },
      columnWidths: [c3n, c3q, c3a, c3p, c3at],
      rows: allFaqRows
    }),
    new D.Paragraph({ children: [new D.PageBreak()] })
  ];

  // ─────────────────────────────────────────────────────────────────────────
  // SECTION 4 — RECOMMENDED ACTIONS
  // ─────────────────────────────────────────────────────────────────────────
  var c4n  = Math.floor(CW * 0.05);
  var c4t  = Math.floor(CW * 0.28);
  var c4a  = Math.floor(CW * 0.55);
  var c4p  = CW - c4n - c4t - c4a;

  var ACTION_ITEMS = [
    {
      title: 'Accountability & Investigation Finalization',
      desc:  'Conclude the forensic audit to formally establish the individual accountability of the involved internal managers. This includes the final documentation of breaches regarding the Code of Conduct and statutory labor protections.',
      priority: 'High'
    },
    {
      title: 'Disciplinary & Separation Measures',
      desc:  'Implement immediate management separation protocols to safeguard corporate compliance and ethical standards. This measure is critical for professional liability avoidance, protection of corporate assets, and ensuring operational business continuity.',
      priority: 'High'
    },
    {
      title: 'Strategic Succession Planning',
      desc:  'Prioritize the strategic recruitment and onboarding of replacement leadership to fill the functional vacuum created by the removal of non-compliant management, ensuring alignment with the Company\'s core values.',
      priority: 'High'
    },
    {
      title: 'Reputational & Professional Restitution',
      desc:  'Execute a formal "Reputational Restore & Apologies" program for the Data Subject. This includes the official rectification of personnel files, public or internal reinstatement of professional standing, and other appropriate compensatory measures for documented distress.',
      priority: 'High'
    },
    {
      title: 'Corporate Narrative Correction',
      desc:  'Implement a structured internal communication plan to correct the manipulated narrative. This involves clarifying organizational changes to stakeholders and neutralizing the "proxy-based" biases disseminated during the period of hostility.',
      priority: 'High'
    },
    {
      title: 'Governance Resilience & Preventative Controls',
      desc:  'Deploy robust governance frameworks, including enhanced anti-harassment monitoring, anonymous whistleblowing escalation paths, and mandatory sensitivity training to prevent recidivism and mitigate future systemic risks.',
      priority: 'High'
    },
    {
      title: 'Anti-Harassment & Non-Discrimination Training',
      desc:  'Execute a comprehensive educational program focusing on unconscious bias, ethnic sensitivity, and workplace dignity. This initiative is designed to realign the corporate culture with statutory non-discrimination requirements and prevent the weaponization of cultural tropes.',
      priority: 'Medium-High'
    }
  ];

  function actionRow(num, item, alt) {
    var bg = alt ? ROW_ALT : WHITE;
    var pc = item.priority === 'High' ? RED : AMBER;
    return new D.TableRow({ children: [
      cell(num,           { fill: bg, w: c4n, align: D.AlignmentType.CENTER, color: GRAY }),
      cell(item.title,    { fill: bg, w: c4t, bold: true, size: 18 }),
      cell(item.desc,     { fill: bg, w: c4a, color: '374151', size: 18 }),
      cell(item.priority, { fill: bg, w: c4p, bold: true, color: pc, align: D.AlignmentType.CENTER })
    ]});
  }

  var actions = [
    new D.Paragraph({
      heading: D.HeadingLevel.HEADING_1,
      children: [new D.TextRun({ text: '4.  Recommended Actions', font: 'Arial', size: 32, bold: true, color: ACCENT })]
    }),
    hr(),
    spacer(80),
    new D.Table({
      width: { size: CW, type: D.WidthType.DXA },
      columnWidths: [c4n, c4t, c4a, c4p],
      rows: [
        new D.TableRow({ tableHeader: true, children: [
          cell('#',        { bold: true, fill: ACCENT_LIGHT, color: ACCENT_DARK, w: c4n, align: D.AlignmentType.CENTER }),
          cell('Action',   { bold: true, fill: ACCENT_LIGHT, color: ACCENT_DARK, w: c4t }),
          cell('Description', { bold: true, fill: ACCENT_LIGHT, color: ACCENT_DARK, w: c4a }),
          cell('Priority', { bold: true, fill: ACCENT_LIGHT, color: ACCENT_DARK, w: c4p, align: D.AlignmentType.CENTER })
        ]})
      ].concat(ACTION_ITEMS.map(function(item, i) {
        return actionRow(String(i + 1), item, i % 2 !== 0);
      }))
    }),
    spacer(400)
  ];

  // ─────────────────────────────────────────────────────────────────────────
  // ASSEMBLE DOCUMENT
  // ─────────────────────────────────────────────────────────────────────────
  var doc = new D.Document({
    styles: {
      default: { document: { run: { font: 'Arial', size: 22 } } },
      paragraphStyles: [
        {
          id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true,
          run: { size: 32, bold: true, font: 'Arial', color: ACCENT },
          paragraph: { spacing: { before: 360, after: 120 }, outlineLevel: 0 }
        },
        {
          id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true,
          run: { size: 26, bold: true, font: 'Arial', color: '1E293B' },
          paragraph: { spacing: { before: 240, after: 80 }, outlineLevel: 1 }
        }
      ]
    },
    sections: [{
      properties: {
        page: {
          size:   { width: PAGE_W, height: 16838 },
          margin: { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN }
        }
      },
      headers: {
        default: new D.Header({ children: [
          new D.Paragraph({
            border: { bottom: { style: D.BorderStyle.SINGLE, size: 4, color: BORDER_CLR, space: 1 } },
            spacing: { before: 0, after: 120 },
            tabStops: [{ type: D.TabStopType.RIGHT, position: D.TabStopPosition.MAX }],
            children: [
              new D.TextRun({ text: 'Very Good Peeps  \u2014  Objective Risk Assessment', font: 'Arial', size: 18, color: GRAY }),
              new D.TextRun({ text: '\t' + dateStr, font: 'Arial', size: 18, color: GRAY })
            ]
          })
        ]})
      },
      footers: {
        default: new D.Footer({ children: [
          new D.Paragraph({
            border: { top: { style: D.BorderStyle.SINGLE, size: 4, color: BORDER_CLR, space: 1 } },
            spacing: { before: 120, after: 0 },
            tabStops: [{ type: D.TabStopType.RIGHT, position: D.TabStopPosition.MAX }],
            children: [
              new D.TextRun({ text: 'CONFIDENTIAL \u2014 For Board Use Only', font: 'Arial', size: 16, color: GRAY }),
              new D.TextRun({ text: '\tPage ', font: 'Arial', size: 16, color: GRAY }),
              new D.TextRun({ children: [D.PageNumber.CURRENT], font: 'Arial', size: 16, color: GRAY })
            ]
          })
        ]})
      },
      children: cover
        .concat(exec)
        .concat(breakdown)
        .concat(indicators)
        .concat(actions)
    }]
  });

  D.Packer.toBlob(doc).then(function(blob) {
    var url = URL.createObjectURL(blob);
    var a   = document.createElement('a');
    a.href  = url;
    a.download = 'VGP_Board_Report_' + fileDate + '.docx';
    document.body.appendChild(a);
    a.click();
    setTimeout(function() { document.body.removeChild(a); URL.revokeObjectURL(url); }, 1000);
  });
}
