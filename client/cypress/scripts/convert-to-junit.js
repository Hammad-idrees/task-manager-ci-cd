/**
 * Convert Cypress JSON results to JUnit XML format
 * This script reads Cypress JSON output and converts it to JUnit XML
 */

const fs = require('fs');
const path = require('path');

const resultsPath = path.join(__dirname, '../reports/results.json');
const outputPath = path.join(__dirname, '../reports/junit.xml');

if (!fs.existsSync(resultsPath)) {
  console.log('No Cypress results file found, skipping conversion');
  process.exit(0);
}

try {
  const results = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<testsuites>\n';
  
  let totalTests = 0;
  let totalFailures = 0;
  let totalTime = 0;
  
  results.runs.forEach((run, runIndex) => {
    const suiteName = run.spec.name || `Test Suite ${runIndex + 1}`;
    const suiteTime = (run.stats.duration || 0) / 1000;
    totalTime += suiteTime;
    
    xml += `  <testsuite name="${escapeXml(suiteName)}" tests="${run.stats.tests || 0}" failures="${run.stats.failures || 0}" errors="0" time="${suiteTime.toFixed(3)}">\n`;
    
    run.tests.forEach((test) => {
      totalTests++;
      const testName = test.title.join(' > ');
      const testTime = (test.duration || 0) / 1000;
      const state = test.state || 'unknown';
      
      if (state === 'failed') {
        totalFailures++;
        xml += `    <testcase name="${escapeXml(testName)}" time="${testTime.toFixed(3)}" classname="${escapeXml(suiteName)}">\n`;
        xml += `      <failure message="${escapeXml(test.displayError || 'Test failed')}">\n`;
        xml += `        ${escapeXml(test.displayError || '')}\n`;
        xml += `      </failure>\n`;
        xml += `    </testcase>\n`;
      } else {
        xml += `    <testcase name="${escapeXml(testName)}" time="${testTime.toFixed(3)}" classname="${escapeXml(suiteName)}" />\n`;
      }
    });
    
    xml += `  </testsuite>\n`;
  });
  
  xml += '</testsuites>\n';
  
  // Write summary attributes
  xml = xml.replace(
    '<testsuites>',
    `<testsuites tests="${totalTests}" failures="${totalFailures}" time="${totalTime.toFixed(3)}">`
  );
  
  // Ensure directory exists
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  fs.writeFileSync(outputPath, xml, 'utf8');
  console.log(`✅ Converted Cypress results to JUnit XML: ${outputPath}`);
  console.log(`   Tests: ${totalTests}, Failures: ${totalFailures}`);
} catch (error) {
  console.error('Error converting Cypress results:', error.message);
  process.exit(1);
}

function escapeXml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

