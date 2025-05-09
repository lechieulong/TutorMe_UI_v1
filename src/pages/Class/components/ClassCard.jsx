/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import { updateEnabledStatus } from "../../../redux/classes/ClassSlice";
import { useDispatch } from "react-redux";
import { faMultiply } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import apiURLConfig from "../../../redux/common/apiURLConfig";
import useAuthToken from "../../../hooks/useAuthToken";
import UpdateClass from "../UpdateClass";
import Switch from "@mui/material/Switch";
import axios from "axios";
const GreenSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#007549",
    "&:hover": {
      backgroundColor: alpha("#007549", theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#007549",
  },
}));

const ClassCard = ({
  mentorAndList,
  classItem,
  onSwitchChange,
  onSelect,
  isActive,
  handleDeleteClassSuccess,
  updateClassSuccessfull, // Passed down function to trigger reload in ClassList
  onLoadingChange,
}) => {
  const author = useAuthToken();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

  useEffect(() => {
    onLoadingChange(true); // Bắt đầu loading
    const fetchEnabledStatus = async () => {
      try {
        const response = await axios.get(
          `${apiURLConfig.baseURL}/class/${classItem.id}/enabled`
        );
        if (typeof response.data.isEnabled === "boolean") {
          setIsSwitchOn(response.data.isEnabled);
        } else {
          console.error("Invalid response from API");
        }
      } catch (error) {
        console.error("Failed to fetch enabled status of the class", error);
      } finally {
        onLoadingChange(false); // Kết thúc loading
      }
    };

    fetchEnabledStatus();
  }, [classItem.id]);

  if (!isSwitchOn && !mentorAndList) {
    return null;
  }

  const handleUpdateClassSuccess = () => {
    updateClassSuccessfull();
  };

  const handleSwitchChange = () => {
    // Invert the current switch state
    const newStatus = !isSwitchOn;

    // Create confirmation message based on new status
    const confirmationMessage = newStatus
      ? "Are you sure you want to enable this class?"
      : "Are you sure you want to disable this class?";

    // Show confirmation dialog to the user
    if (window.confirm(confirmationMessage)) {
      // Set loading state to true while the request is in progress
      onLoadingChange(true);

      // Dispatch Redux action to update the class status in the backend
      dispatch(
        updateEnabledStatus({ classId: classItem.id, isEnabled: newStatus })
      )
        .then(() => {
          // Update the switch status in the component
          setIsSwitchOn(newStatus);

          // Show success message to user
          alert(
            `Class has been ${newStatus ? "enabled" : "disabled"} successfully.`
          );

          if (onSwitchChange) {
            onSwitchChange(classItem.id, newStatus);
          }
        })
        .catch((error) => {
          // Handle error if something goes wrong
          console.error("Failed to update class status", error);
          alert("An error occurred while updating class status.");
        })
        .finally(() => {
          // Set loading state to false once the request is complete
          onLoadingChange(false);
        });
    }
  };

  const handleCardClick = () => {
    if (author == null) {
      navigate("/login");
    }
    if (mentorAndList) {
      return;
    }

    if (!isSwitchOn) {
      alert("This class is currently unavailable.");
      onSelect && onSelect(false);
    } else {
      onSelect && onSelect(classItem.id);
      if (location.pathname.includes("/classOfCourse")) {
        navigate(`/classDetail/${classItem.courseId}/${classItem.id}`, {
          state: { mentorAndList },
        });
      }
    }
  };

  const handleDeleteClass = async (event) => {
    event.stopPropagation(); // Prevent event from being triggered by the parent div

    const confirmationMessage =
      "Are you sure you want to delete this class? This action cannot be undone.";

    // Show confirmation dialog to the user
    if (window.confirm(confirmationMessage)) {
      // Set loading state to true while the request is in progress
      onLoadingChange(true);

      try {
        const response = await axios.delete(
          `${apiURLConfig.baseURL}/class/${classItem.id}`
        );

        if (response.status === 200) {
          alert("Class has been deleted successfully.");
          handleDeleteClassSuccess(); // Trigger reload in ClassList component
        } else {
          alert("Unable to delete this class.");
        }
      } catch (error) {
        console.error("Failed to delete class", error);
        alert("An error occurred while deleting the class.");
      } finally {
        // Set loading state to false once the request is complete
        onLoadingChange(false);
      }
    }
  };

  const handleUpdateClass = () => {
    setIsUpdateOpen(true); // Open the popup
  };

  const cardClassName = location.pathname.includes("/classOfCourse")
    ? "flex-shrink-0 w-full sm:w-1/1 md:w-1/2 lg:w-1/2 p-2 cursor-pointer"
    : "flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2 cursor-pointer";

  const isDelete = classItem?.enrollmentCount > 0 ? false : true;
  return (
    <div className={cardClassName} onClick={handleCardClick}>
      <div
        className={`border rounded-lg shadow hover:shadow-lg transition-transform duration-200 ${
          isActive ? "border-green-400" : "border-gray-200"
        }`}
      >
        <div className="pl-4 pr-4 pt-4 bg-white">
          <h5 className="text-lg font-semibold text-gray-800">
            {classItem.className}
          </h5>
          <p className="text-sm text-gray-500 mt-1">
            Enrolled: {classItem.enrollmentCount}
          </p>

          {/* Class Description with Ellipsis */}
          <p
            className="text-sm text-gray-500 mt-1 h-16 overflow-hidden text-ellipsis hover:text-gray-800"
            style={{ maxWidth: "250px" }}
            title={classItem.classDescription} // Tooltip on hover
          >
            {classItem.classDescription}
          </p>
        </div>

        {mentorAndList && (
          <div className="pl-4 pr-4 flex items-center justify-between">
            <GreenSwitch
              checked={isSwitchOn}
              onChange={handleSwitchChange}
              inputProps={{ "aria-label": "Green switch" }}
            />
            <div>
              <button
                onClick={handleUpdateClass}
                className="text-red-500 text-sm font-semibold hover:text-red-700"
              >
                Update
              </button>
              {isDelete && (
                <button
                  onClick={handleDeleteClass}
                  className="text-red-500 text-sm font-semibold hover:text-red-700 "
                >
                  <FontAwesomeIcon icon={faMultiply} className="text-xl" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      {isUpdateOpen && (
        <UpdateClass
          classItem={classItem}
          courseId={classItem.courseId}
          onClose={() => setIsUpdateOpen(false)} // Close popup when closed
          onCreateSuccess={handleUpdateClassSuccess} // Call function when update is successful
        />
      )}
    </div>
  );
};

export default ClassCard;
