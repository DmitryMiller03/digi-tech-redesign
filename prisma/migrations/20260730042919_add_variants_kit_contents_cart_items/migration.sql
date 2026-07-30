/*
  Warnings:

  - You are about to drop the column `productId` on the `contact_requests` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "contact_requests" DROP COLUMN "productId",
ADD COLUMN     "company" TEXT;

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "kitContents" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "variantGroupId" TEXT,
ADD COLUMN     "variantLabel" TEXT;

-- CreateTable
CREATE TABLE "contact_request_items" (
    "id" TEXT NOT NULL,
    "contactRequestId" TEXT NOT NULL,
    "productId" TEXT,
    "productName" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "contact_request_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "contact_request_items_contactRequestId_idx" ON "contact_request_items"("contactRequestId");

-- CreateIndex
CREATE INDEX "products_variantGroupId_idx" ON "products"("variantGroupId");

-- AddForeignKey
ALTER TABLE "contact_request_items" ADD CONSTRAINT "contact_request_items_contactRequestId_fkey" FOREIGN KEY ("contactRequestId") REFERENCES "contact_requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contact_request_items" ADD CONSTRAINT "contact_request_items_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;
