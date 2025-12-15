import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CategoryRow = ({ category, onDelete }) => {
  const navigate = useNavigate();

  const onUpdateHandler = () => {
    navigate(`/dashboard/categories/update`);
    toast("Navigated to update category", {
      icon: "✏️",
      style: { background: "#50cc89", color: "#fff" },
    });
  };

  const onDeleteHandler = () => {
    if (onDelete) onDelete(category.id);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 24px",
        borderRadius: "12px",
        background: "#fff",
        boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
        transition: "all 0.3s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#e6f9f0";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "#fff";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div style={{ fontWeight: "600", fontSize: "16px", color: "#444" }}>
        {category.name}
      </div>
      <div style={{ display: "flex", gap: "12px" }}>
        <button
          onClick={onUpdateHandler}
          style={{
            background: "#50cc89",
            color: "#fff",
            borderRadius: "8px",
            padding: "6px 14px",
            border: "none",
            minWidth: "80px",
            transition: "all 0.3s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#47be7d")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#50cc89")
          }
        >
          Update
        </button>
        <button
          onClick={onDeleteHandler}
          style={{
            background: "#f1416c",
            color: "#fff",
            borderRadius: "8px",
            padding: "6px 14px",
            border: "none",
            minWidth: "80px",
            transition: "all 0.3s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#d7375d")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#f1416c")
          }
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CategoryRow;
