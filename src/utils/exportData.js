/**
 * Utility functions for exporting data to CSV and JSON formats
 */

export function exportToCSV(models) {
  const headers = [
    "Brand",
    "Model",
    "Series",
    "Device Type",
    "Channel Count",
    "Max Resolution",
    "Incoming Bandwidth",
    "1-Channel Max Stream",
    "2-Channel Max Stream",
    "3-Channel Max Stream",
    "4-Channel Max Stream",
    "Total Decoding Capacity",
    "Video Compression",
    "SATA Storage",
    "PoE Ports",
    "Datasheet URL"
  ];

  const rows = models.map(m => [
    `"${m.brand || ''}"`,
    `"${m.model || ''}"`,
    `"${m.series || ''}"`,
    `"${m.deviceType || ''}"`,
    m.channelCount || '',
    `"${m.maxResolution || ''}"`,
    `"${m.incomingBandwidth || ''}"`,
    `"${m.streams?.ch1?.text || ''}"`,
    `"${m.streams?.ch2?.text || ''}"`,
    `"${m.streams?.ch3?.text || ''}"`,
    `"${m.streams?.ch4?.text || ''}"`,
    `"${(m.totalDecodingCapacity || '').replace(/"/g, '""')}"`,
    `"${(m.compression || []).join(', ')}"`,
    `"${m.sataPorts || ''}"`,
    m.poePorts || 0,
    `"${m.sourceUrl || ''}"`
  ]);

  const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `nvr-models-stream-specs-${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportToJSON(models) {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(models, null, 2));
  const link = document.createElement("a");
  link.setAttribute("href", dataStr);
  link.setAttribute("download", `nvr-models-stream-specs-${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
