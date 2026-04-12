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

  var faqCompliance  = getFaqByCategory('compliance');
  var faqManagerial  = getFaqByCategory('managerial');
  var faqCharacter   = getFaqByCategory('character');

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
      spacing: { after: 200 },
      children: [new D.TextRun({
        text: 'This report presents a structured assessment of organizational risk exposure derived from documented incidents, behavioral patterns, and identified compliance gaps within Very Good Peeps. The analysis is segmented across four primary risk domains: Legal, Compliance, Reputational, and Corporate Assets.',
        font: 'Arial', size: 22, color: '374151'
      })]
    }),
    new D.Paragraph({
      spacing: { after: 280 },
      children: [new D.TextRun({
        text: '[PLACEHOLDER \u2014 Replace with executive narrative once incident data is finalized. Include key findings, the period covered, methodology used to score exposure, and board-level recommendation for action.]',
        font: 'Arial', size: 22, color: '9CA3AF', italics: true
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
  var c3q  = Math.floor(CW * 0.44);
  var c3a  = Math.floor(CW * 0.38);
  var c3p  = CW - c3n - c3q - c3a;

  function faqBlock(catLabel, items, startIdx) {
    var rows = [];
    // Sub-header
    rows.push(new D.TableRow({
      children: [
        new D.TableCell({
          borders: borders,
          columnSpan: 4,
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
      var qTxt = truncate(item.q, 180);
      var aTxt = truncate(stripHtml(item.a), 280);
      var per  = item.meta && item.meta.period ? item.meta.period : '\u2014';
      rows.push(new D.TableRow({ children: [
        cell(n,    { fill: bg, w: c3n, align: D.AlignmentType.CENTER, color: GRAY }),
        cell(qTxt, { fill: bg, w: c3q, bold: true, size: 18 }),
        cell(aTxt, { fill: bg, w: c3a, color: '374151', size: 18 }),
        cell(per,  { fill: bg, w: c3p, color: GRAY, size: 17, italic: true })
      ]}));
    });
    return rows;
  }

  var allFaqRows = [
    new D.TableRow({
      tableHeader: true,
      children: [
        cell('#',       { bold: true, fill: ACCENT_LIGHT, color: ACCENT_DARK, w: c3n, align: D.AlignmentType.CENTER }),
        cell('Finding', { bold: true, fill: ACCENT_LIGHT, color: ACCENT_DARK, w: c3q }),
        cell('Status',  { bold: true, fill: ACCENT_LIGHT, color: ACCENT_DARK, w: c3a }),
        cell('Period',  { bold: true, fill: ACCENT_LIGHT, color: ACCENT_DARK, w: c3p })
      ]
    })
  ]
  .concat(faqBlock('Compliance', faqCompliance, 0))
  .concat(faqBlock('Managerial Malice', faqManagerial, faqCompliance.length))
  .concat(faqBlock('Character Assassination', faqCharacter, faqCompliance.length + faqManagerial.length));

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
      columnWidths: [c3n, c3q, c3a, c3p],
      rows: allFaqRows
    }),
    new D.Paragraph({ children: [new D.PageBreak()] })
  ];

  // ─────────────────────────────────────────────────────────────────────────
  // SECTION 4 — RECOMMENDED ACTIONS
  // ─────────────────────────────────────────────────────────────────────────
  var c4n  = Math.floor(CW * 0.07);
  var c4a  = Math.floor(CW * 0.46);
  var c4d  = Math.floor(CW * 0.25);
  var c4p  = CW - c4n - c4a - c4d;

  function actionRow(num, action, domain, priority, alt) {
    var bg  = alt ? ROW_ALT : WHITE;
    var pc  = priority === 'High' ? RED : (priority === 'Medium' ? AMBER : '059669');
    return new D.TableRow({ children: [
      cell(num,      { fill: bg, w: c4n, align: D.AlignmentType.CENTER }),
      cell(action,   { fill: bg, w: c4a, color: '9CA3AF', italic: true }),
      cell(domain,   { fill: bg, w: c4d }),
      cell(priority, { fill: bg, w: c4p, bold: true, color: pc, align: D.AlignmentType.CENTER })
    ]});
  }

  var actions = [
    new D.Paragraph({
      heading: D.HeadingLevel.HEADING_1,
      children: [new D.TextRun({ text: '4.  Recommended Actions', font: 'Arial', size: 32, bold: true, color: ACCENT })]
    }),
    hr(),
    spacer(80),
    new D.Paragraph({
      spacing: { after: 280 },
      children: [new D.TextRun({
        text: '[PLACEHOLDER \u2014 Replace each row with specific, prioritized actions for board resolution. Include owner, deadline, and measurable outcome for each item.]',
        font: 'Arial', size: 22, color: '9CA3AF', italics: true
      })]
    }),
    new D.Table({
      width: { size: CW, type: D.WidthType.DXA },
      columnWidths: [c4n, c4a, c4d, c4p],
      rows: [
        new D.TableRow({ tableHeader: true, children: [
          cell('#',        { bold: true, fill: ACCENT_LIGHT, color: ACCENT_DARK, w: c4n, align: D.AlignmentType.CENTER }),
          cell('Action',   { bold: true, fill: ACCENT_LIGHT, color: ACCENT_DARK, w: c4a }),
          cell('Domain',   { bold: true, fill: ACCENT_LIGHT, color: ACCENT_DARK, w: c4d }),
          cell('Priority', { bold: true, fill: ACCENT_LIGHT, color: ACCENT_DARK, w: c4p, align: D.AlignmentType.CENTER })
        ]}),
        actionRow('1', '[Placeholder \u2014 Legal action item]',            'Legal',           'High',   false),
        actionRow('2', '[Placeholder \u2014 Compliance action item]',       'Compliance',      'High',   true),
        actionRow('3', '[Placeholder \u2014 Reputational action item]',     'Reputational',    'Medium', false),
        actionRow('4', '[Placeholder \u2014 Corporate Assets action item]', 'Corporate Assets','Medium', true)
      ]
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
