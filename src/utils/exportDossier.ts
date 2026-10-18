import { jsPDF } from 'jspdf';
import { TasteSynthesisResponse } from '../types';

export function exportDossierAsJSON(data: TasteSynthesisResponse) {
  const exportPayload = {
    title: 'Qloo Resonance — Cultural Affinity Media Dossier',
    exportedAt: new Date().toISOString(),
    archetype: data.archetype,
    dominantAesthetics: data.dominantAesthetics,
    culturalTemperament: data.culturalTemperament,
    latentVectorDescription: data.latentVectorDescription,
    agentDeliberation: data.agentInsights,
    recommendations: data.recommendations.map((r) => ({
      name: r.name,
      domain: r.domain,
      creator: r.creator,
      year: r.year,
      affinityScore: `${r.affinityScore}%`,
      serendipityIndex: `${r.serendipityIndex}%`,
      aestheticTags: r.aestheticTags,
      crossDomainBridge: r.crossDomainBridge,
      curatorialRationale: r.whyItFits,
      themeOrQuote: r.quoteOrTheme,
    })),
    eveningCapsule: data.eveningCapsule,
  };

  const blob = new Blob([JSON.stringify(exportPayload, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const slug = (data.archetype || 'taste-dossier')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-');
  a.download = `qloo-dossier-${slug}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportDossierAsPDF(data: TasteSynthesisResponse) {
  const doc = new jsPDF({
    unit: 'pt',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 45;
  const contentWidth = pageWidth - margin * 2;
  let y = 50;

  // Header Title
  doc.setFont('times', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(26, 26, 26);
  doc.text('QLOO RESONANCE', margin, y);
  y += 16;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(120, 120, 120);
  doc.text('CROSS-DOMAIN CULTURAL AFFINITY & AGENTIC MEDIA DOSSIER', margin, y);
  y += 8;

  // Hairline divider
  doc.setDrawColor(210, 200, 185);
  doc.setLineWidth(1);
  doc.line(margin, y, pageWidth - margin, y);
  y += 24;

  // Archetype & Aesthetics
  doc.setFont('times', 'italic');
  doc.setFontSize(16);
  doc.setTextColor(180, 130, 80);
  doc.text(data.archetype, margin, y);
  y += 16;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(90, 90, 90);
  const aestheticsLine = `DOMINANT AESTHETICS: ${data.dominantAesthetics.join('  ·  ')}`;
  doc.text(aestheticsLine, margin, y);
  y += 18;

  // Temperament
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(60, 60, 60);
  const temperamentLines = doc.splitTextToSize(data.culturalTemperament, contentWidth);
  doc.text(temperamentLines, margin, y);
  y += temperamentLines.length * 13 + 20;

  // Recommendations Section Header
  doc.setFont('times', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(26, 26, 26);
  doc.text('CURATED MEDIA RECOMMENDATIONS', margin, y);
  y += 10;
  doc.setDrawColor(220, 220, 220);
  doc.line(margin, y, pageWidth - margin, y);
  y += 16;

  // Recommendations List
  data.recommendations.forEach((item, index) => {
    // Check page break
    if (y > pageHeight - 90) {
      doc.addPage();
      y = 50;
    }

    doc.setFont('times', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(20, 20, 20);
    const titleLine = `${index + 1}. ${item.name} (${item.year}) — ${item.creator}`;
    doc.text(titleLine, margin, y);

    // Scores
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(180, 130, 80);
    const scoreText = `Affinity: ${item.affinityScore}% | Serendipity: ${item.serendipityIndex}% [${item.domain.toUpperCase()}]`;
    doc.text(scoreText, pageWidth - margin - doc.getTextWidth(scoreText), y);
    y += 12;

    // Rationale
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(80, 80, 80);
    const rationaleLines = doc.splitTextToSize(item.whyItFits, contentWidth);
    doc.text(rationaleLines, margin + 10, y);
    y += rationaleLines.length * 11 + 4;

    // Cross domain bridge
    if (item.crossDomainBridge) {
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(8);
      doc.setTextColor(120, 110, 100);
      const bridgeLines = doc.splitTextToSize(`Bridge: ${item.crossDomainBridge}`, contentWidth - 10);
      doc.text(bridgeLines, margin + 10, y);
      y += bridgeLines.length * 10 + 10;
    } else {
      y += 8;
    }
  });

  // Evening Capsule Section
  if (data.eveningCapsule) {
    if (y > pageHeight - 160) {
      doc.addPage();
      y = 50;
    } else {
      y += 12;
    }

    doc.setFont('times', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(26, 26, 26);
    doc.text(`EVENING IMMERSION CAPSULE: ${data.eveningCapsule.title.toUpperCase()}`, margin, y);
    y += 10;
    doc.setDrawColor(220, 220, 220);
    doc.line(margin, y, pageWidth - margin, y);
    y += 16;

    const c = data.eveningCapsule;
    const phases = [
      { label: '19:00 Twilight Sound', val: `${c.twilightSound.title} by ${c.twilightSound.artist || 'Artist'}` },
      { label: '21:00 Feature Screening', val: `${c.featureScreening.title} directed by ${c.featureScreening.director || 'Director'}` },
      { label: '23:30 Midnight Reading', val: `${c.midnightReading.title} by ${c.midnightReading.author || 'Author'}` },
    ];

    phases.forEach((p) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(60, 60, 60);
      doc.text(p.label, margin, y);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(90, 90, 90);
      doc.text(`— ${p.val}`, margin + 120, y);
      y += 13;
    });

    y += 4;
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(110, 110, 110);
    doc.text(`Atmosphere: ${c.ambientSetting}`, margin, y);
    y += 11;
    doc.text(`Pairing: ${c.beveragePairing}`, margin, y);
    y += 14;
  }

  // Footer on all pages
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(150, 150, 150);
    doc.text(
      `Qloo Resonance — Agentic Cultural Affinity Engine · Page ${i} of ${totalPages}`,
      margin,
      pageHeight - 25
    );
  }

  const slug = (data.archetype || 'taste-dossier')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-');
  doc.save(`qloo-dossier-${slug}.pdf`);
}
