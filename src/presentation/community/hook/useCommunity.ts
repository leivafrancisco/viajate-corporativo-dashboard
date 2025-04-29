import { createMyCommunity } from "@/core/community/actions/create-community.action";
import { getCommunities } from "@/core/community/actions/show-community.action";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";

export const useCommunity = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const communitiesQuery = useQuery({
    queryKey: ["community"],
    queryFn: getCommunities,
    staleTime: 1000 * 60 * 10,
  });

  const createCommunity = useMutation({
    mutationFn: createMyCommunity,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["community"],
      });

      enqueueSnackbar("La comunidad se ha creado correctamente", {
        variant: "success",
      });
    },
    onError: (error: Error) => {
      enqueueSnackbar(
        error.message ?? "Ocurrió un error al crear la comunidad",
        { variant: "error" }
      );
    },
  });

  return {
    communitiesQuery,
    createCommunity,
  };
};
