export interface AuditLogEntry {
  id: string;
  timestamp: string;
  action: 'login_attempt' | 'login_success' | 'login_failure' | 'logout';
  userEmail: string;
  userLevel?: string;
  ipAddress?: string;
  userAgent?: string;
}

export const logAuditEvent = (
  action: AuditLogEntry['action'],
  userEmail: string,
  userLevel?: string,
  success?: boolean
) => {
  const auditEntry: AuditLogEntry = {
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
    action,
    userEmail,
    userLevel,
    ipAddress: 'Unknown', // In a real app, this would come from the server
    userAgent: navigator.userAgent
  };

  // Get existing audit logs
  const existingLogs = JSON.parse(localStorage.getItem('privacypal_audit_logs') || '[]');
  
  // Add new entry
  existingLogs.push(auditEntry);
  
  // Keep only last 1000 entries to prevent localStorage from growing too large
  if (existingLogs.length > 1000) {
    existingLogs.splice(0, existingLogs.length - 1000);
  }
  
  // Save back to localStorage
  localStorage.setItem('privacypal_audit_logs', JSON.stringify(existingLogs));
  
  console.log('Audit log entry created:', auditEntry);
};

export const getAuditLogs = (): AuditLogEntry[] => {
  return JSON.parse(localStorage.getItem('privacypal_audit_logs') || '[]');
};
