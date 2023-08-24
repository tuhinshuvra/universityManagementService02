import catchAsync from "../../../shared/catchAsync";

import { Request, Response } from "express";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { BuildingService } from "./building.service";
import { buildingFilterAbleFields } from "./buildings.constrants";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await BuildingService.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Building created successfully!",
    data: result
  })
})

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await BuildingService.getAllFromDB();

  const filters = pick(req.query, buildingFilterAbleFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Building fetched successfully!",
    data: result
  })
})

export const BuildingController = {
  insertIntoDB,
  getAllFromDB
}