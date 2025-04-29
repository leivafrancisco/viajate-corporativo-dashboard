import { Community } from "../interface/community.interface";
import { CommunityDBResponse } from "../interface/communityDBResponse.interface";

// mapper
export const mapCommunityResponseToModel = (data: CommunityDBResponse): Community => ({
    name: data.nombre,
    description: data.descripcion,
  });