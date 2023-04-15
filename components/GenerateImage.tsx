import Image from "next/image";

export default function GeneratedImage(props) {
  console.log(props);

  if (!props.predictions.length) return null;

  const predictions = props.predictions.map((prediction) => {
    prediction.lastImage = prediction.output
      ? prediction.output[prediction.output.length - 1]
      : null;
    return prediction;
  });

  return (
    <div>
      <div className="m-auto">
        {predictions
          .filter((prediction) => prediction.output)
          .map((prediction, index) => {
            console.log(prediction);
            return (
              <img
                alt={"prediction" + index}
                key={"prediction" + index}
                layout="fill"
                className="absolute animate-in fade-in"
                style={{ zIndex: index }}
                src={prediction.lastImage}
              />
            );
          })}
      </div>
    </div>
  );
}
