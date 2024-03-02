import { QueryClient, useQueryClient } from "react-query";
import { SearchDataType } from "../../../type";

interface PhotoesDataListProps {
  inputText: string;
}

export default function PhotoesDataList({ inputText }: PhotoesDataListProps) {
  const queryClient = useQueryClient();
  const queryData: any = queryClient.getQueryData(["photos", inputText]);

  return (
    <div>
      {queryData?.map((photo: SearchDataType, index: number) => (
        <div key={index} className="imageContainer">
          <img
            src={photo.urls.thumb}
            srcSet={`${photo.urls.thumb} 375w, ${photo.urls.small} 768w`}
            sizes="(max-width: 768px) 375px, 768px"
            alt={photo.alt_description}
          />
        </div>
      ))}
    </div>
  );
}
