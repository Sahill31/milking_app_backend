import * as cron from 'node-cron';
import { MilkingSession } from '../models/milkingSession';
import { logger } from '../utils/logger';

// Marks abandoned sessions (active sessions older than 24 hours)
export const sessionCleanupJob = () => {
  logger.info('Starting session cleanup job');
  
  // Schedule to run every hour
  cron.schedule('0 * * * *', async () => {
    try {
      logger.info('Running session cleanup task');
      
      // Find active sessions older than 24 hours
      const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      
      const result = await MilkingSession.deleteMany(
        {
          status: 'active',
          start_time: { $lt: twentyFourHoursAgo }
        }
      );

      logger.info(`Session cleanup completed: ${result.deletedCount} sessions deleted`);
      
    } catch (error) {
      logger.error('Session cleanup job failed', error);
    }
  });

  logger.info('Session cleanup job scheduled to run every hour');
};
