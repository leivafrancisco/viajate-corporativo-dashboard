import { useQuery } from "@tanstack/react-query";
import { getCommunityTypes } from "@/core/community/actions/get-community-types.action";

export const useCommunityTypes = () => {
  const communityTypesQuery = useQuery({
    queryKey: ["community-types"],
    queryFn: getCommunityTypes,
    staleTime: 1000 * 60 * 10, // 10 minutos
  });

  return {
    communityTypesQuery,
  };
}; 