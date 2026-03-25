import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { MakeupLook, Tutorial } from "../backend.d";
import { Category } from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllLooks() {
  const { actor, isFetching } = useActor();
  return useQuery<MakeupLook[]>({
    queryKey: ["looks"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllLooks();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllTutorials() {
  const { actor, isFetching } = useActor();
  return useQuery<Tutorial[]>({
    queryKey: ["tutorials"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllTutorials();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useLikeLook() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not available");
      await actor.likeLook(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["looks"] });
    },
  });
}

export { Category };
