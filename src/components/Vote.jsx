import PropTypes from "prop-types";
import { AppIconButton, AppIconButtonText } from "./AppButton";
import {
  ArrowUpCircleIcon,
  ArrowUpCircleIconFilled,
} from "../icons/ArrowUpCircleIcon";
import {
  ArrowDownCircleIcon,
  ArrowDownCircleIconFilled,
} from "../icons/ArrowDownCircleIcon";

export function VoteButtons({
  upVoteCount,
  downVoteCount,
  onUpVote,
  onDownVote,
  onNeutralizeVote,
  isUpVoted,
  isDownVoted,
}) {
  return (
    <>
      <AppIconButton
        hasText
        onClick={() => (isUpVoted ? onNeutralizeVote() : onUpVote())}
      >
        {isUpVoted ? <ArrowUpCircleIconFilled /> : <ArrowUpCircleIcon />}
        <AppIconButtonText>{upVoteCount}</AppIconButtonText>
      </AppIconButton>
      <AppIconButton
        hasText
        onClick={() => (isDownVoted ? onNeutralizeVote() : onDownVote())}
      >
        {isDownVoted ? <ArrowDownCircleIconFilled /> : <ArrowDownCircleIcon />}
        <AppIconButtonText>{downVoteCount}</AppIconButtonText>
      </AppIconButton>
    </>
  );
}

VoteButtons.propTypes = {
  className: PropTypes.string,
  upVoteCount: PropTypes.number.isRequired,
  downVoteCount: PropTypes.number.isRequired,
  isUpVoted: PropTypes.bool.isRequired,
  isDownVoted: PropTypes.bool.isRequired,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
  onNeutralizeVote: PropTypes.func.isRequired,
};
