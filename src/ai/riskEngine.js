import { RISK_WEIGHTS } from '../config/constants';
import { mockViolations } from '../data/mockViolations';
import { mockCompliance } from '../data/mockCompliance';
import { mockInspections } from '../data/mockInspections';
import { mockCorrectiveActions } from '../data/mockCorrectiveActions';
import { mockSafety } from '../data/mockSafety';

/**
 * AI Risk Scoring Engine
 * Configurable weighted risk model — prototype implementation
 * Clearly labeled as a CONFIGURABLE PROTOTYPE risk model
 */

function calculateSafetyScore(mineId) {
  const violations = mockViolations.filter(v => v.mineId === mineId && v.category === 'Safety');
  const incidents = mockSafety.filter(s => s.mineId === mineId);
  const criticalViolations = violations.filter(v => v.severity === 'critical').length;
  const openViolations = violations.filter(v => !['resolved', 'closed'].includes(v.status)).length;
  const criticalIncidents = incidents.filter(i => i.severity === 'critical').length;
  let score = Math.min(100, (criticalViolations * 30) + (openViolations * 15) + (criticalIncidents * 25));
  return score;
}

function calculateEnvironmentalScore(mineId) {
  const envViolations = mockViolations.filter(v => v.mineId === mineId && v.category === 'Environment');
  const openEnvViolations = envViolations.filter(v => !['resolved', 'closed'].includes(v.status)).length;
  const envCompliance = mockCompliance.filter(c => c.mineId === mineId && c.category === 'Environment');
  const overdueEnv = envCompliance.filter(c => c.status === 'overdue' || c.status === 'non_compliant').length;
  let score = Math.min(100, (openEnvViolations * 25) + (overdueEnv * 20));
  return score;
}

function calculateHistoricalScore(mineId) {
  const allViolations = mockViolations.filter(v => v.mineId === mineId);
  const totalViolations = allViolations.length;
  const resolvedViolations = allViolations.filter(v => ['resolved', 'closed'].includes(v.status)).length;
  const resolutionRate = totalViolations > 0 ? resolvedViolations / totalViolations : 1;
  let score = Math.min(100, (totalViolations * 10) + ((1 - resolutionRate) * 50));
  return score;
}

function calculateComplianceDelayScore(mineId) {
  const mineCompliance = mockCompliance.filter(c => c.mineId === mineId);
  const overdue = mineCompliance.filter(c => c.status === 'overdue').length;
  const nonCompliant = mineCompliance.filter(c => c.status === 'non_compliant').length;
  let score = Math.min(100, (overdue * 20) + (nonCompliant * 25));
  return score;
}

function calculateInspectionScore(mineId) {
  const inspections = mockInspections.filter(i => i.mineId === mineId && i.status === 'completed');
  if (inspections.length === 0) return 50;
  const latestScore = inspections[inspections.length - 1]?.complianceScore || 50;
  return Math.max(0, 100 - latestScore);
}

function calculateCorrectiveActionScore(mineId) {
  const actions = mockCorrectiveActions.filter(ca => ca.mineId === mineId);
  const overdue = actions.filter(ca => ca.status === 'overdue').length;
  const total = actions.length;
  if (total === 0) return 0;
  let score = Math.min(100, (overdue / total) * 100);
  return score;
}

export function calculateRiskScore(mineId) {
  const safetyScore = calculateSafetyScore(mineId);
  const environmentalScore = calculateEnvironmentalScore(mineId);
  const historicalScore = calculateHistoricalScore(mineId);
  const complianceDelayScore = calculateComplianceDelayScore(mineId);
  const inspectionScore = calculateInspectionScore(mineId);
  const correctiveActionScore = calculateCorrectiveActionScore(mineId);

  const overallScore = Math.round(
    safetyScore * RISK_WEIGHTS.safety +
    environmentalScore * RISK_WEIGHTS.environmental +
    historicalScore * RISK_WEIGHTS.historical +
    complianceDelayScore * RISK_WEIGHTS.complianceDelay +
    inspectionScore * RISK_WEIGHTS.inspectionFindings +
    correctiveActionScore * RISK_WEIGHTS.correctiveActions
  );

  const riskLevel = overallScore <= 25 ? 'low' : overallScore <= 50 ? 'medium' : overallScore <= 75 ? 'high' : 'critical';

  return {
    overallScore: Math.min(100, overallScore),
    components: {
      safety: { score: safetyScore, weight: RISK_WEIGHTS.safety, weighted: Math.round(safetyScore * RISK_WEIGHTS.safety) },
      environmental: { score: environmentalScore, weight: RISK_WEIGHTS.environmental, weighted: Math.round(environmentalScore * RISK_WEIGHTS.environmental) },
      historical: { score: historicalScore, weight: RISK_WEIGHTS.historical, weighted: Math.round(historicalScore * RISK_WEIGHTS.historical) },
      complianceDelay: { score: complianceDelayScore, weight: RISK_WEIGHTS.complianceDelay, weighted: Math.round(complianceDelayScore * RISK_WEIGHTS.complianceDelay) },
      inspectionFindings: { score: inspectionScore, weight: RISK_WEIGHTS.inspectionFindings, weighted: Math.round(inspectionScore * RISK_WEIGHTS.inspectionFindings) },
      correctiveActions: { score: correctiveActionScore, weight: RISK_WEIGHTS.correctiveActions, weighted: Math.round(correctiveActionScore * RISK_WEIGHTS.correctiveActions) },
    },
    riskLevel,
    aiGenerated: true,
    confidence: 0.87,
    generatedAt: new Date().toISOString(),
    modelVersion: 'v1.0-prototype',
    disclaimer: 'This is a configurable prototype risk model. Scores are for decision-support purposes only and do not constitute official regulatory determinations.',
  };
}

export function generateRecommendations(mineId) {
  const riskData = calculateRiskScore(mineId);
  const recommendations = [];
  const components = riskData.components;

  if (components.safety.score > 50) {
    recommendations.push({
      id: `REC-${mineId}-SAF`,
      priority: 'high',
      category: 'Safety',
      risk: 'Elevated safety risk score',
      recommendation: 'Schedule targeted safety inspection. Review worker training records and PPE compliance. Consider temporary operational restrictions in high-risk zones.',
      confidence: 0.88,
    });
  }
  if (components.environmental.score > 40) {
    recommendations.push({
      id: `REC-${mineId}-ENV`,
      priority: 'high',
      category: 'Environment',
      risk: 'Environmental compliance concerns',
      recommendation: 'Schedule environmental inspection. Verify sensor calibration and monitoring equipment. Review discharge and emission controls.',
      confidence: 0.85,
    });
  }
  if (components.complianceDelay.score > 30) {
    recommendations.push({
      id: `REC-${mineId}-CMP`,
      priority: 'medium',
      category: 'Compliance',
      risk: 'Multiple overdue compliance items',
      recommendation: 'Prioritize document verification and assign compliance officer. Set escalation protocol for continued delays.',
      confidence: 0.82,
    });
  }
  if (components.correctiveActions.score > 40) {
    recommendations.push({
      id: `REC-${mineId}-CA`,
      priority: 'medium',
      category: 'Corrective Actions',
      risk: 'Overdue corrective actions',
      recommendation: 'Escalate overdue corrective actions to mine management. Consider administrative penalties if delays continue.',
      confidence: 0.80,
    });
  }
  if (components.inspectionFindings.score > 40) {
    recommendations.push({
      id: `REC-${mineId}-INS`,
      priority: 'medium',
      category: 'Inspections',
      risk: 'Recent inspection revealed significant findings',
      recommendation: 'Schedule follow-up inspection within 60 days. Monitor corrective action implementation closely.',
      confidence: 0.83,
    });
  }

  if (recommendations.length === 0) {
    recommendations.push({
      id: `REC-${mineId}-OK`,
      priority: 'low',
      category: 'General',
      risk: 'No significant risk factors identified',
      recommendation: 'Continue routine monitoring schedule. Maintain current compliance practices.',
      confidence: 0.90,
    });
  }

  return recommendations;
}
