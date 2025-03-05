
import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  paginate: (pageNumber: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  paginate
}) => {
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };
  
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      paginate(currentPage + 1);
    }
  };

  // Generate array of page numbers
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="mt-8">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={goToPreviousPage} 
              className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
          
          {/* First page */}
          {currentPage > 3 && (
            <PaginationItem>
              <PaginationLink onClick={() => paginate(1)}>
                1
              </PaginationLink>
            </PaginationItem>
          )}
          
          {/* Ellipsis */}
          {currentPage > 4 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          
          {/* Pages */}
          {pageNumbers
            .filter(number => {
              if (totalPages <= 7) return true;
              return Math.abs(number - currentPage) < 3 || number === 1 || number === totalPages;
            })
            .map(number => {
              // Skip if we already added first or last page
              if ((number === 1 && currentPage > 3) || (number === totalPages && currentPage < totalPages - 2)) {
                return null;
              }
              
              return (
                <PaginationItem key={number}>
                  <PaginationLink 
                    isActive={currentPage === number} 
                    onClick={() => paginate(number)}
                  >
                    {number}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
          
          {/* Ellipsis */}
          {currentPage < totalPages - 3 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          
          {/* Last page */}
          {currentPage < totalPages - 2 && (
            <PaginationItem>
              <PaginationLink onClick={() => paginate(totalPages)}>
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          )}
          
          <PaginationItem>
            <PaginationNext 
              onClick={goToNextPage} 
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationControls;
