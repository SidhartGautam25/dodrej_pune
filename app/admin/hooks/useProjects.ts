import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface ProjectDataInput {
  id?: string;
  name: string;
  location: string;
  typology: string;
  price: string;
  image?: File | null;
  possession?: string;
  tag1?: string;
  tag2?: string;
  highlights: string[];
  rera: string;
  category: "apartments" | "plots";
}

export function useGetProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await fetch("/api/projects");
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to load projects");
      return json.data;
    },
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ProjectDataInput) => {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("location", data.location);
      formData.append("typology", data.typology);
      formData.append("price", data.price);
      formData.append("rera", data.rera);
      formData.append("category", data.category);
      if (data.possession) formData.append("possession", data.possession);
      if (data.tag1) formData.append("tag1", data.tag1);
      if (data.tag2) formData.append("tag2", data.tag2);
      formData.append("highlights", JSON.stringify(data.highlights));
      if (data.image) {
        formData.append("image", data.image);
      }

      const res = await fetch("/api/projects", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to create project");
      return json.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ProjectDataInput) => {
      if (!data.id) throw new Error("Project ID is required for update.");
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("location", data.location);
      formData.append("typology", data.typology);
      formData.append("price", data.price);
      formData.append("rera", data.rera);
      formData.append("category", data.category);
      formData.append("possession", data.possession || "");
      formData.append("tag1", data.tag1 || "");
      formData.append("tag2", data.tag2 || "");
      formData.append("highlights", JSON.stringify(data.highlights));
      if (data.image) {
        formData.append("image", data.image);
      }

      const res = await fetch(`/api/projects/${data.id}`, {
        method: "PUT",
        body: formData,
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to update project");
      return json.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to delete project");
      return json.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}
