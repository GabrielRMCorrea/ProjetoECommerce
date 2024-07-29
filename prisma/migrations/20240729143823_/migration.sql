/*
  Warnings:

  - You are about to drop the `adresses` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[adresses] DROP CONSTRAINT [adresses_userId_fkey];

-- DropTable
DROP TABLE [dbo].[adresses];

-- CreateTable
CREATE TABLE [dbo].[addresses] (
    [addressId] INT NOT NULL IDENTITY(1,1),
    [userId] INT NOT NULL,
    [address] NVARCHAR(255) NOT NULL,
    CONSTRAINT [addresses_pkey] PRIMARY KEY CLUSTERED ([addressId])
);

-- AddForeignKey
ALTER TABLE [dbo].[addresses] ADD CONSTRAINT [addresses_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[users]([userId]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
