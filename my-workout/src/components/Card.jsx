const Card = ({ id, date, time, exercises }) => {
  return (
    <Card key={id} className="p-4 bg-gray-100 shadow rounded-md">
      <div className="mb-2">
        <span className="text-sm text-gray-500">
          {date} à {time}
        </span>
      </div>
    </Card>
  );
};

export default Card;
