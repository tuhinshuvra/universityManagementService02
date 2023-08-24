import { Building, Prisma } from "@prisma/client";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IPaginationOptions } from "../../../interfaces/pagination";
import prisma from "../../../shared/prisma";
import { IBuildingFilterRequest } from "./building.interface";
import { buildingSearchAbleFields } from "./buildings.constrants";



const insertIntoDB = async (data: Building): Promise<Building> => {
  const result = await prisma.building.create({
    data
  })
  return result;
}

const getAllFromDB = async (
  filters: IBuildingFilterRequest,
  options: IPaginationOptions
) => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm } = filters;

  const andConditons = [];

  if (searchTerm) {
    andConditons.push({
      OR: buildingSearchAbleFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive'
        }
      }))
    })
  }

  const whereConditons: Prisma.BuildingWhereInput =
    andConditons.length > 0 ? { AND: andConditons } : {};

  const result = await prisma.building.findMany({
    skip,
    take: limit,
    where: whereConditons,

    orderBy: options.sortBy && options.sortOrder
      ? {
        [options.sortBy]: options.sortOrder
      }
      : {
        createdAt: 'desc'
      }
  });
  return result;
}

export const BuildingService = {
  insertIntoDB,
  getAllFromDB
}