BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[products] (
    [productId] INT NOT NULL IDENTITY(1,1),
    [productName] NVARCHAR(255) NOT NULL,
    [stockQty] INT NOT NULL,
    [categoryId] INT NOT NULL,
    CONSTRAINT [products_pkey] PRIMARY KEY CLUSTERED ([productId])
);

-- CreateTable
CREATE TABLE [dbo].[categories] (
    [categoryId] INT NOT NULL IDENTITY(1,1),
    [categoryName] NVARCHAR(255) NOT NULL,
    CONSTRAINT [categories_pkey] PRIMARY KEY CLUSTERED ([categoryId])
);

-- CreateTable
CREATE TABLE [dbo].[users] (
    [userId] INT NOT NULL IDENTITY(1,1),
    [userFullName] NVARCHAR(255) NOT NULL,
    [email] NVARCHAR(255) NOT NULL,
    [password] NVARCHAR(255) NOT NULL,
    [isAdmin] BIT NOT NULL CONSTRAINT [users_isAdmin_df] DEFAULT 0,
    CONSTRAINT [users_pkey] PRIMARY KEY CLUSTERED ([userId]),
    CONSTRAINT [users_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[carts] (
    [cartId] INT NOT NULL IDENTITY(1,1),
    [shopQty] INT NOT NULL,
    [assignedAt] DATETIME2 NOT NULL CONSTRAINT [carts_assignedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [productId] INT NOT NULL,
    [userId] INT NOT NULL,
    CONSTRAINT [carts_pkey] PRIMARY KEY CLUSTERED ([cartId]),
    CONSTRAINT [carts_productId_userId_key] UNIQUE NONCLUSTERED ([productId],[userId])
);

-- CreateTable
CREATE TABLE [dbo].[adresses] (
    [adressId] INT NOT NULL IDENTITY(1,1),
    [userId] INT NOT NULL,
    CONSTRAINT [adresses_pkey] PRIMARY KEY CLUSTERED ([adressId])
);

-- AddForeignKey
ALTER TABLE [dbo].[products] ADD CONSTRAINT [products_categoryId_fkey] FOREIGN KEY ([categoryId]) REFERENCES [dbo].[categories]([categoryId]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[carts] ADD CONSTRAINT [carts_productId_fkey] FOREIGN KEY ([productId]) REFERENCES [dbo].[products]([productId]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[carts] ADD CONSTRAINT [carts_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[users]([userId]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[adresses] ADD CONSTRAINT [adresses_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[users]([userId]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
