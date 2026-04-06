import React from "react"
import { HiStar } from "react-icons/hi";

export const SetRating = ({ rating }) => {
    // Determine the color based on the rating value
    const getColor = (r) => {
        if (r === 0) return '#808080'; // Gray
        if (r <= 1) return '#FF0000'; // Red
        if (r <= 2) return '#FF7F00'; // Orange
        if (r <= 3) return '#A4A42D'; // Dark Yellow
        if (r <= 4) return '#27AE60'; // Green
        return 'green';
    };

    const color = getColor(rating);

    return (
        <div className="flex items-center gap-0.5" style={{ minWidth: '100px' }}>
            {[1, 2, 3, 4, 5].map((star) => (
                <HiStar 
                    key={star} 
                    color={star <= Math.round(rating) ? color : '#E5E7EB'} 
                    size={16}
                />
            ))}
        </div>
    );
};

// Keeping the old Rating export just in case other parts of the app rely on it, 
// though SetRating is the main one used in Show/ProductView.
export const Rating = ({ rating, color }) => {
    return (
        <div className="flex items-center gap-1" style={{ color: color }}>
            <span className="text-sm font-bold">{rating}</span>
            <HiStar size={16} />
        </div>
    );
};