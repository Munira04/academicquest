-- AlterTable
ALTER TABLE "User" ADD COLUMN     "challenges" TEXT,
ADD COLUMN     "codingLevel" TEXT,
ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "languages" TEXT,
ADD COLUMN     "learnStyle" TEXT,
ADD COLUMN     "learningGoal" TEXT,
ADD COLUMN     "onboardingDone" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "resetCode" TEXT,
ADD COLUMN     "resetExpiry" TIMESTAMP(3),
ADD COLUMN     "studyLevel" TEXT,
ADD COLUMN     "studyTime" TEXT,
ADD COLUMN     "verifyCode" TEXT,
ADD COLUMN     "verifyExpiry" TIMESTAMP(3);
